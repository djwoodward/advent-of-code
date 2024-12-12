import { println } from '../ts-common/common.ts'

const exampleData = await Deno.readTextFile('example.txt')
const inputData = await Deno.readTextFile('input.txt')

function parseInput(input: string): number[][] {
    return input.split('\n').map(l => l.split('x').map(s => parseInt(s)))
}

function solve1(inputData: string): number {
    return parseInput(inputData).reduce((acc, value) => {
        const side1 = 2 * value[0] * value[1]
        const side2 = 2 * value[1] * value[2]
        const side3 = 2 * value[0] * value[2]
        const slack = Math.min(side1, side2, side3) / 2
        return acc + side1 + side2 + side3 + slack
    }, 0)
}

function solve2(inputData: string): number {
    return parseInput(inputData).reduce((acc, value) => {
        const side1 = value[0]
        const side2 = value[1]
        const side3 = value[2]
        const ribbon = (side1 + side2 + side3 - Math.max(side1, side2, side3)) * 2
        const bow = side1 * side2 * side3
        println(`ribbon=${ribbon}, bow=${bow}, side1=${side1}, side2=${side2}, side3=${side3}`)
        return acc + ribbon + bow
    }, 0)
}

let part1example = solve1(exampleData)
let part1 = solve1(inputData)
let part2example = solve2(exampleData)
let part2 = solve2(inputData)

println('')
println('--- Part 1 ---------')
println(`example (101) = ${part1example}`)
println(`answer        = ${part1}`)
println('--- Part 2 ---------')
println(`example (48) = ${part2example}`)
println(`answer       = ${part2}`)
println('-------------------')
println('')
println(`Done with Day 1`)
