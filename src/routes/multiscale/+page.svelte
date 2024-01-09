<script lang="ts">
    import {onMount} from 'svelte'
    import D3MultiScale from '$lib/charts/D3MultiScale.js';
    let figure: HTMLElement
    onMount(() => {
        const chart = new D3MultiScale(figure)
        const data = [
                {ts: "2024-01-06 03:48", druck_p01: 21, temp_t01: 89},
                {ts: "2024-01-06 04:48", druck_p01: 7,  temp_t01: 34},
                {ts: "2024-01-06 05:48", druck_p01: 32, temp_t01: 12},
                {ts: "2024-01-06 08:48", druck_p01: 45, temp_t01: 20},
                {ts: "2024-01-06 12:48", druck_p01: 20, temp_t01: 68},
                {ts: "2024-01-06 17:48", druck_p01: 18, temp_t01: 17},
                {ts: "2024-01-06 18:48", druck_p01: 9, temp_t01: 22},
                {ts: "2024-01-06 23:48", druck_p01: 15, temp_t01: 33},
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
