<script lang="ts">
    import {onMount} from 'svelte'
    import d3Proxy from '$lib/charts/D3Proxy.js';
    import { writable } from 'svelte/store';

    let figure: HTMLElement, addData: HTMLButtonElement

    const pressureVisibility = writable(true)
    const temperatureVisibility = writable(true)

    onMount(() => {
        const data = new Map ([
            ["2024-01-06 03:48", {press_01: 21, press_02: 51, temp_01: 12, temp_02: 80}],
            ["2024-01-06 04:48", {press_01: 56, press_02: 48, temp_01: 44, temp_02: 49}],
            ["2024-01-06 05:48", {press_01: 33, press_02: 36, temp_01: 25, temp_02: 22}],
            ["2024-01-06 06:48", {press_01: 52, press_02: 24, temp_01: 13, temp_02: 17}],
            ["2024-01-06 07:48", {press_01: 12, press_02: 13, temp_01: 47, temp_02: 45}],
            ["2024-01-06 08:48", {press_01: 56, press_02: 15, temp_01: 89, temp_02: 33}],
            ["2024-01-06 09:48", {press_01: 11, press_02: 56, temp_01: 98, temp_02: 22}],
            ["2024-01-06 10:48", {press_01: 21, press_02: 56, temp_01: 70, temp_02: -31}],
        ])

        const margin = {top: 10, right: 20, bottom: 40, left: 30}

        const chart = d3Proxy(figure, data, {margin})

        pressureVisibility.subscribe($pressureVisibility => {
            chart.pressureVisibility = $pressureVisibility
        })

        temperatureVisibility.subscribe($temperatureVisibility => {
            chart.temperatureVisibility = $temperatureVisibility
        })

        //addData.addEventListener("click", e => chart.addData())
        addData.addEventListener("click", e => console.log(chart.druck_01))
    })

</script>

<main>
    <fieldset class="mb-3">
        <legend>Видимость: </legend>
            <div class="form-check d-inline-block">
                <input class="form-check-input" type="checkbox" value="" id="temperature"
                    bind:checked={$temperatureVisibility}>
                <label class="form-check-label" for="temperature">
                  температура
                </label>
              </div> 
            <div class="form-check d-inline-block">
                <input class="form-check-input" type="checkbox" value="" id="pressure" 
                    bind:checked={$pressureVisibility}>
                <label class="form-check-label" for="pressure">
                  давление
                </label>
            </div>
            <button class="btn btn-secondary" bind:this={addData}>add data</button>              
    </fieldset>
    <figure bind:this={figure}></figure>
</main>

<style lang="scss">
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        figure{
            width: 1024px;
            height: 70%;
        }
        fieldset{width: 1024px}
    }
</style>
