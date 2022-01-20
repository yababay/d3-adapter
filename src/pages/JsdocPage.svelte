<script>
    import JsCode from '../components/JsCode.svelte'
    import htmlSlice from '../util/html-slice.js'

    export let link
    const fileName = /.*\/([^\/]+)$/.exec(link)[1]

    async function showArticle(){
        let res = await fetch(`content/${fileName}.html`)
        let article = await res.text()
        let h1 = htmlSlice(article, 'h1')
        article = htmlSlice(article, 'section')
        article = article.replace(/[\s]+/g, ' ')
        article = article.replace(/<dl[^\>]+\>/g, '<dl class="hidden">')
        article = article.replace(/<table[^\>]+\>/g, '<table class="table table-striped">')
        article = article.replace(/<th([^\>]+)?\>/g, '<th scope="col">')
        article = article.replace(/<td([^\>]+)?\>/g, '<td>')
        return h1 + article
    }

    async function showCode(){
        let res = await fetch(`content/${fileName}.js.html`)
        let code = await res.text()
        code = htmlSlice(code, 'code', true)
        return code
    }
</script>

{#await showArticle() then html}
        {@html html}
{/await}

{#await showCode() then html}
    <JsCode {html} />
{/await}
