<script>
    import JsCode from '../components/JsCode.svelte'

    export let link
    const fileName = /.*\/([^\/]+)$/.exec(link)[1]

    function htmlSlice(html, tag, inner){
        const starting = `<${tag}>`
        const closing = `</${tag}>`
        let m = html.indexOf(starting)    
        let n = html.indexOf(closing) + closing.length  
        html = html.slice(m, n)
        if(inner) html = html.replace(starting, '')
            .replace(closing, '')
//            .replace(/^[^\>]+\>/, '')
        return html
    }

    async function showArticle(){
        let res = await fetch(`content/${fileName}.html`)
        let article = await res.text()
        article = htmlSlice(article, 'article')
        article = article.replace(/[\s]+/g, ' ')
        article = article.replace(/<dl.*<\/dl>/, '')
        article = article.replace(/<table[^\>]+\>/, '<table class="table table-striped">')
        article = article.replace(/<th([^\>]+)?\>/g, '<th scope="col">')
        article = article.replace(/<td([^\>]+)?\>/g, '<td>')
        return article
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
