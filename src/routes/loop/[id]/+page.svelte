<script lang="ts">
    import { page } from "$app/stores";
    import type { Measurements } from "$lib/types";
    import Chart from "$lib/components/Chart.svelte";
    import type { Readable, Writable } from "svelte/store";
    import type{ DbFields } from "$lib/types";

    

    

    export let data: {measurements : Readable<Promise<Measurements>>, query: Writable<string>,
        labels: Writable<DbFields[]>} 
       
    let {measurements, query, labels} = data
    const { pathname } = $page.url
        
    const filter = new Map<string, boolean>($labels.map(lab => [lab, true]))

    //console.log($labels)
    $labels.forEach(element => {
        //console.log(element)
    });

    let chartHolder

    function toggleFilter(e: Event){
        const {target} = e
        if(!(target instanceof HTMLInputElement)) return
        const {checked, name} = target
        filter.set(name, checked)
        $query = Array.from(filter.entries())
            .filter(([key, value]) => !value)
            .map(([key, value]) => key).join(",")
        console.log($query)
    }
    /*const queryFilter = () => Array.from(filter.entries())
        .filter(([key, value]) => value)
        .map(([key, value]) => key).join(",")*/
</script>

<div class="w-100 text-end pe-3">
    <a href={`${pathname}/pdf`} target="_blank" class="btn btn-primary">выгрузить в pdf</a>
</div>

<div class="row w-100">
    <div class="col-9" bind:this={chartHolder}>
        {#await $measurements}
            <div class=parent>
                <p class=loading>loading</p>
            </div>
            {:then {measurements}} 
            <Chart {measurements} width={chartHolder.offsetWidth}/>
            {:catch error}
            <p>{error}</p> 
        {/await}
    </div>
    <div class="col-3">
        <h6>показывать:</h6>
        <ul class="params">
            {#each $labels as label}
                <li><input class="form-check-input" type="checkbox" name={label}
                    value="" checked={true} on:change={toggleFilter}> {label}</li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .params {
        list-style: none;
        margin: 1rem 0 0 1rem;
    }
    .parent {
        height: 800px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading { 
        color: #000000;
    }
</style>
  