<script lang="ts">
    import {onMount} from 'svelte'
    import D3SimpleLinearChart from '$lib/charts/D3SimpleLinearChart.js'
    let figure: HTMLElement
    onMount(() => {
        const chart = new D3SimpleLinearChart(figure)
        chart.draw([1,2,3,13,9,6,7,8])
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
