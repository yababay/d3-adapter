<script lang="ts">
    import {onMount} from 'svelte'
    import D3AxisY from '$lib/charts/D3AxisY.js';
    let figure: HTMLElement
    onMount(() => {
        const data = new Map ([
            ["2024-01-06 03:48", {press: 21, temp: 89}],
            ["2024-01-06 04:48", {press: 7, temp: 34}],
            ["2024-01-06 05:48", {press: 32, temp: 12}],
            ["2024-01-06 08:48", {press: 45, temp: 20}],
            ["2024-01-06 12:48", {press: 20, temp: 68}],
            ["2024-01-06 17:48", {press: 18, temp: 17}],
            ["2024-01-06 18:48", {press: 9, temp: 22}],
            ["2024-01-06 23:48", {press: 15, temp: 33}],
        ])
        //chart.draw(data)
        const chart = new D3AxisY(figure, data)
        setTimeout(() => {
            const path = chart.pressPath
            if(!path) throw 'no path'
            path.style("stroke", "orange")
            console.log("timeout")
        }, 3000);
    })
</script>

<main>
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
            //border: 1px solid silver;
            //padding: 2.5rem;
            //box-sizing: border-box;
        }
    }
</style>
