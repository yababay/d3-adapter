<script lang="ts">
    import showdown from "showdown"
    import README from "../../README.md?raw"
    const converter = new showdown.Converter()
    const html = converter.makeHtml(README)
</script>

<article>
    {@html html}
</article>

<style>
    article{
        width: 100%;
        max-width: 80ch;
        margin: 3rem auto;
    }
</style>