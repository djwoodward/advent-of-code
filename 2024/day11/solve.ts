import { println } from '../ts-common/common.ts'

const inputData = await Deno.readTextFile('input.txt')
const stones = inputData.split(' ').map(s => parseInt(s))

type Rule = {applicable: (stone: number) => boolean, runRule: (stone: number) => number[]}

println("------")
println(stones)
println("------")

let part1 = 0
let part2 = 0

const rules: Rule[] = [
    // rule 1 - If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
    {applicable: s => s == 0, runRule: s => [1]},
    // rule 2  If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.
    // The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved
    // on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
    {applicable: s => s.toString().length % 2 == 0, 
        runRule: s => {
            const numStr = s.toString()
            const left = numStr.slice(0, numStr.length / 2)
            const right = numStr.slice(numStr.length / 2, numStr.length)
            return [parseInt(left), parseInt(right)]
        }},
    // rule 3 If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by
    // 2024 is engraved on the new stone.
    {applicable: s => true, runRule: s => [s * 2024]}
]

function calculateNumStone(stone: number, iters: number, cache: Map<String, number> = new Map()): number {
    if (iters <= 0) {
        return 1
    }
    const cacheKey = `${stone}-${iters}`
    const cached = cache.get(cacheKey)
    if (cached != undefined) {
        // println(`cacheHit: ${cacheKey} = ${cached}`)
        return cached
    }
    // println(cache)

    // go deeper
    let accumulator = 0
    const nextStones = rules.find(r => r.applicable(stone))!.runRule(stone)
    nextStones.forEach(s => {
        accumulator += calculateNumStone(s, iters - 1, cache)
    })
    // println(`accumulator=${accumulator}, iters=${iters}`)
    cache.set(cacheKey, accumulator)
    return accumulator
}

function calculateNumStones(stone: number[], iters: number): number {
    let accumulator = 0
    stone.forEach(s => {
        accumulator += calculateNumStone(s, iters)
    })
    return accumulator
}

part1 = calculateNumStones(stones, 25)
part2 = calculateNumStones(stones, 75)

println('--- Part 1 ---------')
println(`example ans =  55312`)
println(`answer      =  ${part1}`)
println('--- Part 2 ---------')
println(`answer      =  ${part2}`)
println('-------------------')
println(`Done with Day 10`)
