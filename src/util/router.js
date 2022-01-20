import StaticPage  from '../pages/StaticPage.svelte'
import BackendPage from '../pages/BackendPage.svelte'

const home = 'welcome'
const articleElement = document.querySelector('article')
const mainElement = document.querySelector('main')
const height = mainElement.offsetHeight + 'px'

let lastURL = document.URL;

window.addEventListener("hashchange", function(event){
    Object.defineProperty(event, "oldURL", {enumerable:true,configurable:true,value:lastURL})
    Object.defineProperty(event, "newURL", {enumerable:true,configurable:true,value:document.URL})
    lastURL = document.URL;
    switchHash()
});

function switchHash(){
    let link = /.*#([a-zA-Z0-9\-\/\._]+)$/.exec(document.URL)
    if(!(link && link[1])) link = home
    else {
        link = link[1] 	
        if(link == '/') link = home
    }
    articleElement.innerHTML = ''
    const Fn = /^\/api($|\/.*)/.test(link) ? BackendPage : StaticPage
    new Fn({
        target: articleElement, 
        props: {link, height}
    })
}

export default switchHash

