<div class="row full-height">
    <div class="col-3">
        <ul>
            <li><a href="/">на главную</a></li>
            <li><a href="/simple-line">линейный график</a></li>
            <li><a href="/simple-with-dates">график с датами</a></li>
            <li><a href="/multiline">график c линиями</a></li>
            <li><a href="/multiscale">график c 2 шкалами</a></li>
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