import { println } from '../ts-common/common.ts'

const inputData = await Deno.readTextFile('input.txt')

type Pos = {x: number, y: number, topsReached: {x: number, y: number}[]}

println("------")
println(inputData)
println("------")
const map: number[][] = inputData.split('\n').map(l => l.split('').map(n => parseInt(n)))

let part1 = 0
let part2 = 0
map.forEach((row, y) => {
    row.forEach((num, x) => {
        if (num == 0) {
            part1 += traverse(map, x, y, {x:x, y:y, topsReached: []}, true)
            part2 += traverse(map, x, y, {x:x, y:y, topsReached: []}, false)
        }
    })
})

function traverse(map: number[][], x: number, y: number, trailhead: Pos, unique: boolean): number {
    let trailsSucceeding = 0
    const currentNumber = map[y][x]
    if (currentNumber == 9) {
        if (unique && trailhead.topsReached.some(p => p.x == x && p.y == y)) {
            println(`(${x}, ${y}) h:${currentNumber}, (duplicate)`)
            return 0
        }
        trailhead.topsReached.push({x:x, y:y})
        println(`(${x}, ${y}) h:${currentNumber}, (new)`)
        return 1
    }
    println(`(${x}, ${y}) h:${currentNumber}`)
    if (map[y + 1] && (map[y + 1][x] == currentNumber + 1)) {
        trailsSucceeding += traverse(map, x, y + 1, trailhead, unique)
    }
    if (map[y][x + 1] == currentNumber + 1) {
        trailsSucceeding += traverse(map, x + 1, y, trailhead, unique)
    }
    if (map[y - 1] && (map[y - 1][x] == currentNumber + 1)) {
        trailsSucceeding += traverse(map, x, y - 1, trailhead, unique)
    }
    if (map[y][x - 1] == currentNumber + 1) {
        trailsSucceeding += traverse(map, x - 1, y, trailhead, unique)
    }
    // println(`(${x}, ${y}) num=${currentNumber}, count=${trailsSucceeding}`)

    return trailsSucceeding
}

println('--- Part 1 ---------')
println('sum         =  36')
println(`answer(698) =  ${part1}`)
println('--- Part 2 ---------')
println('example = 81')
println(`answer  = ${part2}`)
println('-------------------')
println(`Done with Day 10`)
