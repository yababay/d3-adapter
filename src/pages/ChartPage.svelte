<script>
    import { onMount } from 'svelte'
    import D3RadialGraph from '../components/charts/D3RadialGraph.js'
    import D3SimpleLinearChart from '../components/charts/D3SimpleLinearChart.js'
    import D3SimpleBarChart from '../components/charts/D3SimpleBarChart.js'
    import randomData from '../util/random-data.js'

    export let link, height

    let figure

    onMount(()=>{
        const chartType = /.*\/([^\/]+)$/.exec(link)[1]
        let Chart = null
        switch(chartType){
            case 'radial-graph':
                Chart = D3RadialGraph
                break
            case 'simple-linear':
                Chart = D3SimpleLinearChart
                break
            case 'simple-bar':
                Chart = D3SimpleBarChart
                break
            default:
                throw `Не указан тип графика (${charType}).`
        }
        const chart = new Chart(figure, height)
        chart.draw(randomData())
    })
</script>

<figure bind:this={figure} />

