<script lang="ts">
    import {onMount} from 'svelte'
    import D3LinearWithDates from '$lib/charts/D3LinearWithDates.js';
    let figure: HTMLElement
    onMount(() => {
        const chart = new D3LinearWithDates(figure)
        const data = [
            [21, new Date(2024, 1, 6, 3, 48, 42, 11)], 
            [7, new Date(2024, 1, 6, 3, 52, 42, 11)],
            [32, new Date(2024, 1, 6, 3, 53, 42, 11)],
            [45, new Date(2024, 1, 6, 3, 57, 42, 11)],
            [20, new Date(2024, 1, 6, 4, 0, 42, 11)],
            [18, new Date(2024, 1, 6, 4, 5, 42, 11)],
            [9, new Date(2024, 1, 6, 4, 12, 42, 11)],
            [15, new Date(2024, 1, 6, 4, 31, 42, 11)]
        ]
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
