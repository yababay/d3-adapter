<script lang="ts">
    import {onMount} from 'svelte'
    import D3Dynamic from '$lib/charts/D3Dynamic.js';
    import { writable } from 'svelte/store';

    let figure: HTMLElement, addData: HTMLButtonElement

    const pressureVisibility = writable(true)
    const temperatureVisibility = writable(true)

    onMount(() => {
        const data = new Map ([
            ["2024-01-06 03:48", {press: 21, temp: 89}],
            ["2024-01-06 04:48", {press: 7, temp: 34}],
            ["2024-01-06 05:48", {press: 32, temp: 12}],
            ["2024-01-06 06:48", {press: 45, temp: 20}],
            ["2024-01-06 07:48", {press: 20, temp: 68}],
            ["2024-01-06 08:48", {press: 18, temp: 17}],
            ["2024-01-06 09:48", {press: 9, temp: 22}],
            ["2024-01-06 10:48", {press: 15, temp: 33}],
        ])

        const margin = {top: 10, right: 20, bottom: 40, left: 20}

        const chart = new D3Dynamic(figure, data, {margin})

        pressureVisibility.subscribe($pressureVisibility => {
            chart.pressureVisibility = $pressureVisibility
        })

        temperatureVisibility.subscribe($temperatureVisibility => {
            chart.temperatureVisibility = $temperatureVisibility
        })

        addData.addEventListener("click", e => chart.addData())
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
