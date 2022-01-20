<script>
    import hljs from 'highlight.js';
    export let html
</script>

<p>
  <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#source-code" aria-expanded="false" aria-controls="source-code">
    Посмотреть исходный код
  </button>
</p>
<div class="collapse" id="source-code">
  <div class="card card-body">
    <div class="code">
        {@html hljs.highlight(html, {language: 'js'}).value}
    </div>
  </div>
</div>

<style>
    .code {
        background-color: #272822;
        white-space: pre;
        padding: 3rem;
    }
</style>
