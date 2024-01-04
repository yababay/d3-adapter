<script lang="ts">
    import {onMount} from 'svelte'
    import D3SimpleLinearChart from '$lib/charts/D3SimpleLinearChart.js'
    let figure: HTMLElement
    onMount(() => {
        const chart = new D3SimpleLinearChart(figure)
        chart.draw([1,2,3,4,6,5,8,7,9])
    })
</script>

<main>
    <figure bind:this={figure}></figure>
</main>
