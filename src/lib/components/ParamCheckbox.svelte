<script lang="ts">
    export let param: string, chart
    const [_, num] = /.*(\d+)$/.exec(param) || []
    if(!num) throw "bad param"
</script>

<div class="form-check d-inline-block">
    <input class="form-check-input" type="checkbox" value="" id={param}
        bind:checked={chart[`${param}_visibility`]}>
    <label class="form-check-label" for="temperature">
      {param.startsWith("temp_") ? "температура" : "давление"} {num}
    </label>
  </div> 