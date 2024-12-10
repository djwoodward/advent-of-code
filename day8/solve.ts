import { pairs } from './common.ts'

const inputData = await Deno.readTextFile('input.txt')

const result = inputData.split('\n').map(line => {
    return line.split('')
  }
);

const antennas = []
let xmax = result[0].length
let ymax = result.length
result.forEach((line, y) => {
    line.forEach((item, x) => {
        process.stdout.write(item)
        if (item != '.') {
            antennas.push({value: item, x: x, y: y})
        }
    });
    process.stdout.write('\n')
    ymax = result.length
    xmax = line.length
});

console.log(`xmax=${xmax}, ymax=${ymax}`)
const antennaPairs = pairs(antennas).filter(item => item[0].value == item[1].value)
console.log(antennaPairs)
const allAntennaPairs = antennaPairs.flatMap(i => i)
console.log(allAntennaPairs)

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
            // console.log(`(${x1},${y1}) -> (${x2},${y2}) -> (${x3},${y3}), diffx=${diffx}. diffy=${diffy}`)
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

console.log('-------------------')
console.log(`part1 = ${part1.length}`)
console.log(`part2 = ${part2.length}`)
console.log('-------------------')
console.log(`Done with Day 8`)
