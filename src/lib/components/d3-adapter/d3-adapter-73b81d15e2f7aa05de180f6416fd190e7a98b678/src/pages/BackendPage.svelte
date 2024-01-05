<script>
    import JsdocPage from './JsdocPage.svelte'
    import ChartPage from './ChartPage.svelte'
    
    export let link, height
    const props = {link, height}
</script>

{#if link.includes('/chart/')}
    <ChartPage link={link} height={height} />
{/if}

{#if link.includes('/jsdoc/')}
    <JsdocPage link={link} />
{/if}

