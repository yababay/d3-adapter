<script>
    import { onMount } from 'svelte'
    import D3RadialGraph from '../components/charts/D3RadialGraph.js'

    export let link, height

    let figure

    onMount(()=>{
        const chartType = /.*\/([^\/]+)$/.exec(link)[1]
        const data = new Array(30).fill(2).map(el => el + Math.random())
        let Chart = null
        switch(chartType){
            case 'radial-graph':
                Chart = D3RadialGraph
                break
            default:
                throw `Не указан тип графика (${charType}).`
        }
        const chart = new Chart(figure, height)
        chart.draw(data)
    })
</script>

<figure bind:this={figure}/>

