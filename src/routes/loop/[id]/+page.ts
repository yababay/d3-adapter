import { page } from "$app/stores"
import type { ChartData } from "$lib/types"
import { DbFields } from "$lib/types"
import { derived, writable } from "svelte/store"

export const ssr = !true
export const csr = true

const labels = writable(Object.values(DbFields))
    //.filter(str => str.startsWith("druck_") || str.startsWith("temp_")))
//console.log(labels)
//const filter = writable(new Map<string, boolean>(labels.map(lab => [lab, true])))

/*const query = derived (filter, $filter => Array.from($filter.entries())
        .filter(([key, value]) => !value)
        .map(([key, value]) => key).join(","))*/

const query = writable("")

//let labels: string[]

const measurements = derived([page, query], async ([$page, $query]) => {
    const {id} = $page.params
    const res = await fetch(`/api/db/${id}?filter=${encodeURIComponent($query)}`)
    if(res.status > 299) throw "bad res"
    const array = (await res.json())
    if(!Array.isArray(array)) throw "no array"
        const entries = array.filter(el => Array.isArray(el))
            .filter(([key, value]) => {
            if(typeof key !== "string") return false
            if(!Array.isArray(value)) return false 
            return value.filter(({value}) => !!value).length > 0  
        })
        //labels.set(entries.map(([key ]) => key))
        labels.set(entries.map(([key ]) => key).filter(str => 
            str.startsWith("druck_") || str.startsWith("temp_")))
        return {measurements : new Map<DbFields, ChartData[]>(entries.map((entry: any) => {
        if(!Array.isArray(entry)) throw "bad entry"
        const[key, value] = entry
        if(!(key && value)) throw "bad key and value"
        return [key as DbFields, value.map((el: ChartData) => 
            ({...el, date: new Date(el.date)}))]
    }))}
})

export function load(){
    return {measurements, query, labels}
}
