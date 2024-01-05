<script lang="ts">
    import {onMount} from 'svelte'
    import D3SimpleLinearChart from '$lib/charts/D3SimpleLinearChart.js'
    let figure: HTMLElement
    onMount(() => {
        const chart = new D3SimpleLinearChart(figure)
        var dataset1 = [
            [1,1], [12,20], [24,36],
            [32, 50], [40, 70], [50, 100],
            [55, 106], [65, 123], [73, 130],
            [78, 134], [83, 136], [89, 138],
            [100, 140]
        ]
        chart.draw(dataset1)
    })
</script>

<main>
    <figure bind:this={figure}></figure>
</main>
