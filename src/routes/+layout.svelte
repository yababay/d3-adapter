<div class="row full-height">
    <div class="col-3">
        <ul>
            <li><a href="/">на главную</a></li>
            <li><a href="/dynamic">простой график</a></li>
            <li><a href="/proxy">proxy</a></li>
        </ul>
    </div>
    <div class="col-9">
        <slot />
    </div>
</div>

<style lang="scss">
    .full-height{
        height: 100vh;
    }
    ul{
        height: 100%;
        width: 100%;
        border-right: 1px solid silver;
        margin: 0rem;
        padding-top: 3rem;
        box-sizing: border-box;
        li{
            margin-left: 2rem;
        }
    }
</style>