<script lang="ts">
    import {onMount} from 'svelte'
    import D3MappedShowSimple from '$lib/charts/D3MappedShowSimple.js';
    let figure: HTMLElement
    onMount(() => {
        const chart = new D3MappedShowSimple(figure)
        const data = new Map ([
            ["2024-01-06 03:48", {measurements: {press: 21, temp: 89}, chart: {color: "red"}}],
            ["2024-01-06 04:48", {measurements: {press: 7, temp: 34}, chart: {color: "green"}}],
            ["2024-01-06 05:48", {measurements: {press: 32, temp: 12}, chart: {color: "yellow"}}],
            ["2024-01-06 08:48", {measurements: {press: 45, temp: 20}, chart: {color: "black"}}],
            ["2024-01-06 12:48", {measurements: {press: 20, temp: 68}, chart: {color: "green"}}],
            ["2024-01-06 17:48", {measurements: {press: 18, temp: 17}, chart: {color: "orange"}}],
            ["2024-01-06 18:48", {measurements: {press: 9, temp: 22}, chart: {color: "pink"}}],
            ["2024-01-06 23:48", {measurements: {press: 15, temp: 33}, chart: {color: "cyan"}}],
        ])
        chart.draw(data)
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
