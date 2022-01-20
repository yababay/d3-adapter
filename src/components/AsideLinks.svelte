<script>
    import BookIcon from '@yababay67/svelte-meets-bootstrap-icons/book.svelte'
    import SignpostIcon from '@yababay67/svelte-meets-bootstrap-icons/signpost.svelte'
    import Listing from '@yababay67/svelte-meets-bootstrap-icons/list-columns-reverse.svelte'
    import BarChart from '@yababay67/svelte-meets-bootstrap-icons/bar-chart-line.svelte'
    export let links
</script>

{#each links as link}
    <li>
        <a href={link.link} class={`nav-link link-${link.style || "secondary"}`}>
            {#if link.icon == 'signpost'}
                <SignpostIcon size="24" />
            {:else if link.icon == 'listing'}
                <Listing size="24" />
            {:else if link.icon == 'chart'}
                <BarChart size="24" />
            {:else}
                <BookIcon size="24" />
            {/if}
            {link.title}
        </a>
    </li>
{/each}

