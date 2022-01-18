<script>
    import Icon from '@yababay67/svelte-meets-bootstrap-icons/person-plus-fill.svelte'

    export let link = '#community'
    export let title = 'Принять участие'
</script>

<li class="navbar-item ms-3">
    <a class="navbar-link link-secondary" href={link}>
        <Icon {title}/>
    </a>
</li>

