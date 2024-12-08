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

const antinodes = antennaPairs.map(pair => {
    const x1 = pair[0].x
    const y1 = pair[0].y
    const x2 = pair[1].x
    const y2 = pair[1].y

    const diffx = x2-x1
    const diffy = y2-y1
    const x3 = x2 + diffx
    const y3 = y2 + diffy

    if (x3 >= 0 && x3 < xmax && y3 >= 0 && y3 < ymax) {
        console.log(`(${x1},${y1}) -> (${x2},${y2}) -> (${x3},${y3}), diffx=${diffx}. diffy=${diffy}`)
        // console.log([x3, y3])
        return `${x3},${y3}`
    } else {
        // console.log(`nope (${x1},${y1}) -> (${x2},${y2}) -> (${x3},${y3}), diffx=${diffx}. diffy=${diffy}`)
        return null
    }
}).filter(i => i)

// const antinodesNotAntennas = antinodes.filter(a => antennaPairs.some(ap => !(a[0] == ap[0] && a[1] == ap[1])))
const antinodesSorted = Array.from(new Set(antinodes)).sort()
console.log(`antinodes=${antinodesSorted.join(" | ")}`)

// antinodes.forEach( a =>{
//     if (result[a[1]][a[0]] == '2') {
//         result[a[1]][a[0]] = '3'
//     } else if (result[a[1]][a[0]] == '1') {
//         result[a[1]][a[0]] = '2'
//     } else {
//         result[a[1]][a[0]] = '1'
//     }
// }
// )

console.log(`result1 (14, !421, > 385, <425) = ${antinodesSorted.length}`)
console.log(`Done with Day 8, part 1`)

// result.forEach(element => {
//     element.forEach(c => {
//         process.stdout.write(c)
//     })
//     process.stdout.write('\n')
// });



// ......#....#
// ...#....0...
// ....#0....#.
// ..#....0....
// ....0....#..
// .#....A.....
// ...#........
// #......#....
// ........A...
// .........A..
// ..........#.
// ..........#.