<script>
    import Icon from '@yababay67/svelte-meets-bootstrap-icons/github.svelte'
    import settings from '../../settings.json'

    export let link
    export let title = 'Проект на Github&apos;е'
    export let size = 32
    const props = {title, size}
</script>

<li class="navbar-item icon-holder ms-3">
    <a class="navbar-link link-secondary" href={link} target="_blank">
        <Icon {...props}/>
    </a>
</li>

