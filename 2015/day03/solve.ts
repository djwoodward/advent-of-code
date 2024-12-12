import { println, getWithDefault, splitAlternating} from '../ts-common/common.ts'

const exampleData = await Deno.readTextFile('example.txt')
const inputData = await Deno.readTextFile('input.txt')

type Loc = {x: number, y: number}

function parseInput(input: string): string[] {
    return input.split('')
}

function move(loc: Loc, dir: String): Loc {
    switch(dir) {
        case '^':
            return {x: loc.x, y: loc.y - 1}
        case '>':
            return {x: loc.x + 1, y: loc.y}
        case 'v':
            return {x: loc.x, y: loc.y + 1}
        case '<':
            return {x: loc.x - 1, y: loc.y}
        default:
            throw Error(`Invalid: dir ${dir}`)
    }
}

function solve(directions: string[], visitedSpots: Map<String, number>) {
    // starting coords
    let loc: Loc = {x:0, y:0}
    visitedSpots.set(`${loc.x}_${loc.y}`, 1) // starting position is visited
    directions.forEach(d => {
        // move
        // println(loc)
        loc = move(loc, d)
        // println(loc)
        // println('')
        const visitedTimes = getWithDefault(visitedSpots, `${loc.x}_${loc.y}`, 0)
        // set visited
        visitedSpots.set(`${loc.x}_${loc.y}`, visitedTimes + 1)
    })
}

function solve1(inputData: string): number {
    const directions = parseInput(inputData)
    const visitedSpots: Map<String, number> = new Map()
    solve(directions, visitedSpots)
    return visitedSpots.size
}

function solve2(inputData: string): number {
    const [santa, robo] = splitAlternating(parseInput(inputData))
    const visitedSpots: Map<String, number> = new Map()
    solve(santa, visitedSpots)
    solve(robo, visitedSpots)
    return visitedSpots.size
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
println(`example ans = ${part2}`)
println(`answer      = ${part2example}`)
println('-------------------')
