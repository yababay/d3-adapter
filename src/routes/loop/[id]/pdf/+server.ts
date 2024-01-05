import { getMeasurements } from "$lib/server/db"
import type { ChartData, DbFields } from "$lib/types.js"
import {writeFileSync, readFileSync} from "fs"
import csv2pdf from "./pdf"
import { page } from "$app/stores"

export async function GET({params}) {
    const{id}=params   
    const measurements = await getMeasurements(id)
    const entries = Array.from(measurements.entries())
    const startFile = "стартовое сообщение\т"
    const endFile = "\nконец тестовое сообщение"
    const middleFile = entries[0][1].reduce((acc: string[], element: ChartData, i) => {
        if(acc.length === 0) {
            const header = ["date"]
            for(const entry of entries) {
                if(!(entry[0].includes("temp_") || entry[0].includes("druck_"))) continue
                const arr = /.*_(.*)/.exec(`${entry[0]}`)
                if(!arr) throw "bad param"
                header.push(arr[1])
            }
            acc.push(header.join(", "))
            return acc
        }
        const row = []
        for(const entry of entries) {
            if(!(entry[0].includes("temp_") || entry[0].includes("druck_"))) continue
            const chartData = entry[1]
            const {date, value} = chartData[i]
            if(!row.length) row.push(date.toISOString().substring(11, 19))
            row.push(`${Math.round(value*100)/100}`)
        }
        acc.push(row.join(", "))
        return acc
    }, [])
    .join("\n")
    const fn = `documents/${new Date().toISOString().substring(0, 19)}.csv`
    const text = startFile.concat(middleFile, endFile)
    writeFileSync(fn, text)
    await csv2pdf(fn)
    const buff = readFileSync(fn.replace('.csv', '.pdf'))
    const response = new Response(buff, 
        {headers:{"Content-Type":"application/pdf"}})
    return response
}