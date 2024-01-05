export default function(){
    const length = Math.floor(10 + 20 * Math.random())
    return new Array(length).fill(1.62).map(el => el + Math.random() * (Math.random() > .5 ? 1 : -1))
}
