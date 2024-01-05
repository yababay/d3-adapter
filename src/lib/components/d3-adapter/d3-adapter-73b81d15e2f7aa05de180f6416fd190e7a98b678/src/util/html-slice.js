export default function htmlSlice(html, tag, inner){
    const starting = `<${tag}`
    const closing = `</${tag}>`
    let m = html.indexOf(starting)    
    let n = html.indexOf(closing) + closing.length  
    html = html.slice(m, n)
    if(inner){ 
        html = html.replace(starting, '')
        .replace(closing, '')
        .trim()
        .replace(/^([^\>]+)?\>/, '')
    }
    return html
}
