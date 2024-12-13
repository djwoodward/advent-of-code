import { println } from '../ts-common/common.ts'

const exampleData = await Deno.readTextFile('example.txt')
const inputData = await Deno.readTextFile('input.txt')

function solve1(inputData: string): number {
    return -1
}

function solve2(inputData: string): number {
    return -1
}

let part1example = solve1(exampleData)
let part1 = solve1(inputData)
let part2example = solve2(exampleData)
let part2 = solve2(inputData)

println('')
println('--- Part 1 ---------')
println(`example ans = ${part1example}`)
println(`answer      = ${part1}`)
println('--- Part 2 ---------')
println(`example ans = ${part2example}`)
println(`answer      = ${part2}`)
println('-------------------')
