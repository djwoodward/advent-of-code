import { pairs, print, println } from '../ts-common/common.ts'

const inputData = await Deno.readTextFile('input.txt')

const result = inputData.split('\n').map(line => {
    return line.split('')
  }
);

const antennas: {value: string, x: number, y: number }[] = []
let xmax = result[0].length
let ymax = result.length
result.forEach((line, y) => {
    line.forEach((item, x) => {
        print(item)
        if (item != '.') {
            antennas.push({value: item, x: x, y: y})
        }
    });
    print('\n')
    ymax = result.length
    xmax = line.length
});

println(`xmax=${xmax}, ymax=${ymax}`)
const antennaPairs = pairs(antennas).filter(item => item[0].value == item[1].value)
println(antennaPairs)
const allAntennaPairs = antennaPairs.flatMap(i => i)
println(allAntennaPairs)

function getAntinodes(firstLevel: boolean) {
    let antinodes: Array<String> = []
    if (!firstLevel) {
        antinodes = antennaPairs.flatMap(i => i).map( i => `${i.x},${i.y}`)
    }
    return antennaPairs.flatMap(pair => {
        const x1 = pair[0].x
        const y1 = pair[0].y
        const x2 = pair[1].x
        const y2 = pair[1].y
    
        const diffx = x2-x1
        const diffy = y2-y1
    
        let x3 = x2 + diffx
        let y3 = y2 + diffy
    
        while (x3 >= 0 && x3 < xmax && y3 >= 0 && y3 < ymax) {
            // println(`(${x1},${y1}) -> (${x2},${y2}) -> (${x3},${y3}), diffx=${diffx}. diffy=${diffy}`)
            antinodes.push(`${x3},${y3}`)
    
            if (firstLevel) {
                return antinodes
            }
            x3 = x3 + diffx
            y3 = y3 + diffy
        }
        return antinodes
    })
}

const antinodes = getAntinodes(true)
const antinodes2 = getAntinodes(false)

const part1 = Array.from(new Set(antinodes)).sort()
const part2 = Array.from(new Set(antinodes2)).sort()

println('-------------------')
println(`part1 = ${part1.length}`)
println(`part2 = ${part2.length}`)
println('-------------------')
println(`Done with Day 8`)
