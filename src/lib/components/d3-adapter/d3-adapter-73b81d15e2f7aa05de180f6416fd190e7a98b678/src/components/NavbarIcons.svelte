<script>
    import settings from '../settings.json'
    import Github from './iconified-links/Github.svelte'
    import Community from './iconified-links/Community.svelte'
</script>

{#each settings.navbarIcons as link}
    {#if link.icon == 'github'}
        <Github link={link.link} />
    {/if}
    {#if link.icon == 'community'}
        <Community link={link.link} />
    {/if}
{/each}
