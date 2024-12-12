import { println } from '../ts-common/common.ts'

const inputData = await Deno.readTextFile('input.txt')

let part2 = -1
let part1 = 0
inputData.split('').forEach((value, index) => {
    part1 += value == '(' ? 1 : -1
    if (part2 < 0 && part1 < 0) {
        part2 = index + 1
    }
    if (part2 < 0) {
        println(`part1=${part1}, index=${index}`)
    }
});


println('')
println('--- Part 1 ---------')
println(`answer      =  ${part1}`)
println('--- Part 2 ---------')
println(`answer      =  ${part2}`)
println('-------------------')
println('')
println(`Done with Day 1`)
