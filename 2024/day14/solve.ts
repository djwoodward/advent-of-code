import { println, print } from "../ts-common/common.ts";

const exampleData = await Deno.readTextFile("example.txt");
const inputData = await Deno.readTextFile("input.txt");

function getPositions(robots: number[][], ticks: number, width: number, height: number): [number, number][] {
    const positions: [number, number][] = []
    robots.forEach((r) => {
        const px = r[0];
        const py = r[1];
        const vx = r[2];
        const vy = r[3];
        let px2 = (px + vx * ticks) % width;
        let py2 = (py + vy * ticks) % height;
        if (px2 < 0) {
            px2 = width + px2
        }
        if (py2 < 0) {
            py2 = height + py2
        }

        // println(`p=(${px},${py}) v=(${vx},${vy}), p2=(${px2},${py2})`);
        positions.push([px2, py2])
    });
    return positions
}
function solve(inputData: string, ticks: number, width: number, height: number): number {
    const robots: number[][] = inputData.split("\n").map((l) =>
        l.replaceAll(" ", ",").replaceAll(/[^0-9-,]/g, "").split(",").map((v) =>
            parseInt(v)
        )
    );
    
    const positions: [number, number][] = getPositions(robots, ticks, width, height)

    let q1 = 0
    let q2 = 0
    let q3 = 0
    let q4 = 0
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const numRobots = positions.filter(p => p[0] == x && p[1] == y).length
            if (x < Math.floor(width / 2) && y < Math.floor(height / 2)) {
                // println(`x=${x}, w/2=${width/2}, y=${y}, h/2=${height/2}`)
                q1 += numRobots
            } else if (x > Math.floor(width / 2) && y < Math.floor(height / 2)) {
                // println(`x=${x}, w/2=${width/2}, y=${y}, h/2=${height/2}`)
                q2 += numRobots
            } else if (x < Math.floor(width / 2) && y > Math.floor(height / 2)) {
                // println(`x=${x}, w/2=${width/2}, y=${y}, h/2=${height/2}`)
                q3 += numRobots
            } else if (x > Math.floor(width / 2) && y > Math.floor(height / 2)) {
                // println(`x=${x}, w/2=${width/2}, y=${y}, h/2=${height/2}`)
                q4 += numRobots
            }
            // print(numRobots > 0 ? numRobots : '.')
        }
        // println('')
    }
    // println(`q1=${q1}, q2=${q2}, q3=${q3}, q4=${q4}`)

    return q1 * q2 * q3 * q4;
}

function printPositions(positions: [number, number][], width: number, height: number) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const numRobots = positions.filter(p => p[0] == x && p[1] == y).length
            print(numRobots > 0 ? numRobots : '.')
        }
        println('')
    }
}

function adjacent(x1: number, y1: number, x2: number, y2: number): boolean {
    return (
           (x1 == x2 - 1 && y1 == y2)
        || (x1 == x2     && y1 == y2 + 1)
        || (x1 == x2 + 1 && y1 == y2)
        || (x1 == x2     && y1 == y2 - 1))
}

function solve2(inputData: string): number | undefined {
    const robots: number[][] = inputData.split("\n").map((l) =>
        l.replaceAll(" ", ",").replaceAll(/[^0-9-,]/g, "").split(",").map((v) =>
            parseInt(v)
        )
    );
    
    for (let ticks = 1; ticks< 10_000; ticks++) {
        const positions: [number, number][] = getPositions(robots, ticks, 101, 103)

        const adjacentCount = positions.filter(p => 0 != positions.filter(p2 => adjacent(p[0], p[1], p2[0], p2[1])).length).length
        // println(adjacentCount)
        if (adjacentCount > 250) {
            println('-----------------------------------')
            println(`adjacentCount=${adjacentCount}`)
            println(`ticks=${ticks}`)
            printPositions(positions, 101, 103)
            println('-----------------------------------')
            return ticks
        }
    }
    
    return undefined;
}

let part1example = solve(exampleData, 100, 11, 7);
let part1 = solve(inputData, 100, 101, 103)
let part2example = undefined; // solve2(exampleData)
let part2 = solve2(inputData)

println("");
println("--- Part 1 ---------");
println(`example ans (12)    = ${part1example}`);
println(`answer  (210587128) = ${part1}`);
println("--- Part 2 ---------");
println(`example ans = ${part2example}`);
println(`answer      = ${part2}`);
println("-------------------");
