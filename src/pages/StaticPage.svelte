<script>
    import Showdown from 'showdown'

    const converter = new Showdown.Converter()
    const tocClose = document.querySelector('#toc-offcanvas .btn-close')

    export let link
    export let prefix = 'content'

    async function getMarkup() {
        const res = await fetch(`${prefix}/${link}${link.endsWith(".md") ? "" : ".md"}`)
        if(res.status != 200) throw "Не удалось загрузить запрашиваемый ресурс."
        const txt = await res.text()
        closeOffcanvas()
        return converter.makeHtml(txt)
    }

    function closeOffcanvas(){
        if(tocClose) tocClose.click()
        return ''
    }

</script>

<section class="container">
    {#await getMarkup() then markup}
        <div class="comfortable-reading mt-3">
            {@html markup}
        </div>
    {:catch error}
        <div class="alert alert-danger text-center mt-3" role="alert">
            {error + closeOffcanvas()}
        </div>
    {/await}
</section>    

<style>
    .comfortable-reading {
        max-width: 50rem;
    }
</style>
