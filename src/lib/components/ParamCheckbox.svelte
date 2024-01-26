<script lang="ts">
    import type { Druckable } from "$lib/charts/types.js";
    import { writable } from "svelte/store";

    export let param: string, chart: Druckable | undefined
    
    const isChecked = writable<boolean>(true)
    isChecked.subscribe($isChecked => {
      if(chart) chart[`${param}_visibility`] = $isChecked
    }) 

    
    const [_, num] = /.*(\d+)$/.exec(param) || []
    if(!num) throw "bad param"
</script>

{#if chart && typeof param === "string"}
<div class="form-check d-inline-block">
    <input class="form-check-input" type="checkbox" value="" id={param}
        bind:checked={$isChecked}>
    <label class="form-check-label" for={param}>
      {param.startsWith("temp_") ? "температура" : "давление"} {num}
    </label>
  </div>
  {/if} 