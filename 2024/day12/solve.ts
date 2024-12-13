import { println, print, partition } from '../ts-common/common.ts'

const exampleData = await Deno.readTextFile('example.txt')
const inputData = await Deno.readTextFile('input.txt')

class PlotGroup {
    plots: [number, number][] = []
    constructor(public plant: string, plot: [number, number]) {
        this.plots.push(plot)
    }
    area(): number {
        return this.plots.length
    }
    perimeter(): number {
        let accumulator = 0
        this.plots.forEach(p => {
            const adjacentPlots = this.plots.filter(otherP => adjacent(p[0], p[1], otherP[0], otherP[1]))
            // println(`adjacentPlots=${adjacentPlots.length}`)
            // for every plot, count the sides that are not adjacent to another plot
            accumulator += 4 - adjacentPlots.length
        });
        return accumulator
    }
    sides(): number {
        let accumulator = 0
        this.plots.forEach(p => {
            // this is weird, but it works
            // count corners
            // outside corners = 
            //   up,right != same
            //   up,left != same
            //   down,right != same
            //   down,left != same
            // inside corners
            //   up,right == same && up + right != same
            //   up,left == same && up + left != same
            //   down,right == same && down + right != same
            //   down,left == same && down + left != same
            const up = this.plots.find(otherP => p[0] == otherP[0] && p[1] - 1 == otherP[1])
            const right = this.plots.find(otherP => p[0] + 1 == otherP[0] && p[1] == otherP[1])
            const down = this.plots.find(otherP => p[0] == otherP[0] && p[1] + 1 == otherP[1])
            const left = this.plots.find(otherP => p[0] - 1 == otherP[0] && p[1] == otherP[1])
            const upright = this.plots.find(otherP => p[0] + 1 == otherP[0] && p[1] - 1 == otherP[1])
            const upleft = this.plots.find(otherP => p[0] - 1 == otherP[0] && p[1] - 1 == otherP[1])
            const downright = this.plots.find(otherP => p[0] + 1 == otherP[0] && p[1] + 1 == otherP[1])
            const downleft = this.plots.find(otherP => p[0] - 1 == otherP[0] && p[1] + 1 == otherP[1])
            // count outside corners
            if (!up && !right) {
                accumulator++
            }
            if (!up && !left) {
                accumulator++
            }
            if (!down && !right) {
                accumulator++
            }
            if (!down && !left) {
                accumulator++
            }

            // count inside corners
            if (up && right && !upright) {
                accumulator++
            }
            if (up && left && !upleft) {
                accumulator++
            }
            if (down && right && !downright) {
                accumulator++
            }
            if (down && left && !downleft) {
                accumulator++
            }
        });

        println(`plant=${this.plant}, sides=${accumulator}`)
        return accumulator
    }

    toString(): string {
        return `${this.plant}:${this.plots.join('|')}`
    }

}

function adjacent(x1: number, y1: number, x2: number, y2: number): boolean {
    return (
           (x1 == x2 - 1 && y1 == y2)
        || (x1 == x2     && y1 == y2 + 1)
        || (x1 == x2 + 1 && y1 == y2)
        || (x1 == x2     && y1 == y2 - 1))
}

function combineIntoGroups(plants: string[][]): PlotGroup[] {
    let plotGroups: PlotGroup[] = []

    plants.forEach((l, y) => {
        l.forEach((plant, x) => {
            const [adjacentGroups, remaining] = partition(plotGroups, group => group.plant == plant && group.plots.some(p => adjacent(x, y, p[0], p[1])))
            // if adjacent groups, add new group to that
            if (adjacentGroups.length > 0) {
                // designate the first group as the main group, we will consolidate all groups onto this one
                const mainGroup = adjacentGroups.shift()!
                mainGroup.plots.push([x, y]) // add new plot

                // consolidate other groups
                adjacentGroups.forEach(existingGroup => {
                    mainGroup.plots = mainGroup.plots.concat(existingGroup.plots)
                })
                // reassign plotGroups to all other groups, and this new main group
                plotGroups = [...remaining, mainGroup]
            } else {
                plotGroups.push(new PlotGroup(plant, [x, y]))
            }
        })
    })
    return plotGroups
}

function solve1(inputData: string): number {
    let plants: string[][] = inputData.split('\n').map(l => l.split(''))

    let plotGroups = combineIntoGroups(plants)

    let totalPrice = 0
    plotGroups.forEach(p => {
        println(p)
        const area = p.area()
        const perimeter = p.perimeter()
        println(`area=${area}, perimeter=${perimeter}, price=${perimeter * area}`)
        println('')
        totalPrice += perimeter * area
    });
    return totalPrice
}

function solve2(inputData: string): number {
    let plants: string[][] = inputData.split('\n').map(l => l.split(''))

    let plotGroups = combineIntoGroups(plants)

    let totalPrice = 0
    plotGroups.forEach(p => {
        println(p)
        const area = p.area()
        const sides = p.sides()
        println(`area=${area}, sides=${sides}, price=${sides * area}`)
        println('')
        totalPrice += sides * area
    });
    return totalPrice
}

let part1example = solve1(exampleData)
let part1 = solve1(inputData)
let part2example = solve2(exampleData)
let part2 = solve2(inputData)

println('')
println('--- Part 1 ---------')
println(`example ans (1930) = ${part1example}`)
println(`answer             = ${part1}`)
println('--- Part 2 ---------')
println(`example ans (1206) = ${part2example}`)
println(`answer             = ${part2}`)
println('-------------------')
