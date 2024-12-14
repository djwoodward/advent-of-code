import { println } from "../ts-common/common.ts";

const exampleData = await Deno.readTextFile("example.txt");
const inputData = await Deno.readTextFile("input.txt");

/**
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400
 */
class ClawMachine {
    constructor(
        private machineIndex: number,
        private ax: number,
        private ay: number,
        private bx: number,
        private by: number,
        private px: number,
        private py: number,
    ) {
    }

    // max presses = 100 (part 1 only)
    // a button = 3
    // b button = 1
    determineMinTokens(): number {
        const bPresses = (this.py * this.ax - this.px * this.ay) / (this.by * this.ax - this.bx * this.ay);
        const aPresses = (this.px - bPresses * this.bx) / this.ax;

        console.log(`aPresses = ${aPresses}, bPresses=${bPresses}`);
        if (aPresses % 1 !== 0 || bPresses % 1 !== 0) {
            return 0;
        }
        return (aPresses * 3 + bPresses);
    }
}

function solve(inputData: string, adjustment: number): number {
    const machines: ClawMachine[] = inputData.split("\n\n").map((s, i) => {
        const parts = s.split("\n");
        const [ax, ay, bx, by, px, py] = [parts[0], parts[1], parts[2]].join(',').replaceAll(/[^0-9,]/g, "").split(",").map(
            (s) => parseInt(s)
        );
        return new ClawMachine(i, ax, ay, bx, by, px + adjustment, py + adjustment);
    });

    return machines.reduce(
        (accumulator, a) => accumulator + a.determineMinTokens(),
        0,
    );
}

function solve1(inputData: string): number {
    return solve(inputData, 0);
}

function solve2(inputData: string): number {
    return solve(inputData, 10000000000000);
}

let part1example = solve1(exampleData);
let part1 = solve1(inputData);
let part2example = solve2(exampleData);
let part2 = solve2(inputData)

println("");
println("--- Part 1 ---------");
println(`example ans (480) = ${part1example}`);
println(`answer (29187)    = ${part1}`);
println("--- Part 2 ---------");
println(`example ans = ${part2example}`);
println(`answer      = ${part2}`);
println("-------------------");
