import { println } from '../ts-common/common.ts'
import { createMD5 } from "https://esm.sh/hash-wasm@4.12.0";

const exampleData = await Deno.readTextFile('example.txt')
const inputData = await Deno.readTextFile('input.txt')

async function md5(input: string) {
    const md5 = await createMD5();
    md5.update(input);
    return md5.digest("hex");
}

async function solve(inputData: string, startsWith: string) {
    for (let i = 0; i < 100_000_000_000; i++) {
        if (i % 25000 == 0) {
            println(`Checking ${i}`)
        }
        const hash = await md5(`${inputData}${i}`)
        const result = hash.slice(0, startsWith.length)
        if (result == startsWith) {
            println(`hash=${hash}`)
            return i
        }
    }
    return -1
}

async function solve1(inputData: string): Promise<number> {
    return solve(inputData, '00000')
}

async function solve2(inputData: string): Promise<number> {
    return solve(inputData, '000000')
}

// this is already slow, no need in running examples
// let part1example = await solve1(exampleData)
// let part2example = await solve2(exampleData)
let part1 = await solve1(inputData)
let part2 = await solve2(inputData)

println('')
println('--- Part 1 ---------')
println(`answer          = ${part1}`)
println('--- Part 2 ---------')
println(`answer <6742839 = ${part2}`)
println('-------------------')
