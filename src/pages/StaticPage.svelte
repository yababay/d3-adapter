<script>
    import hljs from 'highlight.js';
    import Showdown from 'showdown'
    import htmlSlice from '../util/html-slice.js'

    const converter = new Showdown.Converter()
    const tocClose = document.querySelector('#toc-offcanvas .btn-close')

    export let link
    export let prefix = 'content'

    async function getMarkup() {
        const res = await fetch(`${prefix}/${link}${link.endsWith(".md") ? "" : ".md"}`)
        if(res.status != 200) throw "Не удалось загрузить запрашиваемый ресурс."
        const txt = await res.text()
        closeOffcanvas()
        let html = converter.makeHtml(txt)
        let code = htmlSlice(html, 'pre', true)
        code = htmlSlice(code, 'code', true).trim()
        html = html.replace(/\s+/g, ' ')
        html = html.replace(/<pre>.*<\/pre>/g, `<div class="wrapped-code">${hljs.highlight(code, {language: 'js'}).value}</div>`)
        return html
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
