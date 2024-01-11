<script lang="ts">
    import {onMount} from 'svelte'
    import D3MappedData from '$lib/charts/D3MappedData.js';
    let figure: HTMLElement
    onMount(() => {
        const chart = new D3MappedData(figure)
        const data = new Map ([
            ["2024-01-06 03:48", {press_01: 21, temp_01: 89, color: "red"}],
            ["2024-01-06 04:48", {press_01: 7,  temp_01: 34, color: "green"}],
            ["2024-01-06 05:48", {press_01: 32, temp_01: 12, color: "yellow"}],
            ["2024-01-06 08:48", {press_01: 45, temp_01: 20, color: "black"}],
            ["2024-01-06 12:48", {press_01: 20, temp_01: 68, color: "green"}],
            ["2024-01-06 17:48", {press_01: 18, temp_01: 17, color: "orange"}],
            ["2024-01-06 18:48", {press_01: 9,  temp_01: 22, color: "pink"}],
            ["2024-01-06 23:48", {press_01: 15, temp_01: 33, color: "cyan"}],
        ])
        chart.draw(data)
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
