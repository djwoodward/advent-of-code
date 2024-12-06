import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess

// example result
// part 1 = 41
// part 2 = 6
val exampleText = 
"""
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
""".trimIndent()

data class Guard(val pos: Pos, val escaped: Boolean = false, val stuck: Boolean = false)
data class Pos(val x: Int, val y: Int, val direction: Char)

fun generateBoard(): Array<Array<Char>> {
    // val inputText = exampleText
    val inputText = Files.readString(Path.of("input.txt"))

    return inputText.lines().map {
        it.toCharArray().toTypedArray()
    }.toTypedArray()
}
// find guard and print board
fun findGuard(board: Array<Array<Char>>, print: Boolean = false): Guard {
    var guard = Guard(Pos(-1, -1, '?'))
    if (print) {
        println("------------------------------------")
    }
    board.forEachIndexed { y, row ->
        row.forEachIndexed { x, char ->
            if (char == '^' || char == 'v' || char == '<' || char == '>') {
                guard = Guard(Pos(x, y, char))
            }
            if (print) {
                print("$char")
            }
        }
        if (print) {
            println()
        }
    }
    if (print) {
        println("------------------------------------")
    }
    return guard
}

fun countGuardPositions(board: Array<Array<Char>>): Int {
    var accumulator = 0
    board.forEachIndexed { y, row ->
        row.forEachIndexed { x, char ->
            if (char == 'X') {
                accumulator ++
            }
        }
    }
    return accumulator
}

fun nextPos(guard: Guard): Pair<Int, Int> {
    return when (guard.pos.direction) {
        '^' -> Pair(guard.pos.x, guard.pos.y - 1)
        'v' -> Pair(guard.pos.x, guard.pos.y + 1)
        '<' -> Pair(guard.pos.x - 1, guard.pos.y)
        '>' -> Pair(guard.pos.x + 1, guard.pos.y)
        else -> throw IllegalArgumentException("Invalid direction: ${guard.pos.direction}")
    }
}

fun nextDirection(guard: Guard): Char {
    return when (guard.pos.direction) {
        '^' -> '>'
        '>' -> 'v'
        'v' -> '<'
        '<' -> '^'
        else -> throw IllegalArgumentException("Invalid direction: ${guard.pos.direction}")
    }
}

fun markGuardPosition(guard: Guard, board: Array<Array<Char>>) {
    board[guard.pos.y][guard.pos.x] = 'X'
}

fun moveGuard(guard: Guard, previousPositions: MutableSet<Pos>, board: Array<Array<Char>>): Guard {
    // findGuard(board)
    // Thread.sleep(1000)
    val nextPos = nextPos(guard)
    // check if guard escaped
    // check if guard is going to hit '#' and if so, turn 90 degrees
    // mark x in current spot
    var newGuard = guard
    if (nextPos.first < 0 || nextPos.first >= board[0].size || nextPos.second < 0 || nextPos.second >= board.size) {
        // println("   Guard escaped!")
        newGuard = Guard(Pos(nextPos.first, nextPos.second, guard.pos.direction), true)
        markGuardPosition(guard, board)
    } else {
        val nextSpot = board[nextPos.second][nextPos.first]
        var nextDirection = guard.pos.direction
        if (previousPositions.contains(Pos(nextPos.first, nextPos.second, nextDirection))) {
            // println("   Guard in a loop!")
            newGuard = Guard(guard.pos, false, true)
        } else if (nextSpot == '#' || nextSpot == 'O') {
            // println("   Guard hit wall!")
            nextDirection = nextDirection(guard)
            newGuard = Guard(Pos(guard.pos.x, guard.pos.y, nextDirection))
        } else {
            // println("   Guard moving to $nextPos")
            // mark udlr in current spot and move guard
            markGuardPosition(guard, board)
            val newPos = Pos(nextPos.first, nextPos.second, nextDirection)
            previousPositions.add(newPos)
            newGuard = Guard(newPos)
        }
    }

    return newGuard
}

fun part1(): Int {
    val board = generateBoard()
    var guard = findGuard(board)
    var previousPosisitions = mutableSetOf<Pos>()
    while (!guard.escaped && !guard.stuck) {
        // println("guard=$guard")
        guard = moveGuard(guard, previousPosisitions, board)
    }
    findGuard(board)
    return countGuardPositions(board)
}

fun placeObstacle(x: Int, y: Int, board: Array<Array<Char>>): Boolean {
    val placed = board[y][x] == '.'
    if (placed) {
        board[y][x] = 'O'
    }
    return placed
}

fun part2(): Int {
    var accumulator = 0
    var board = generateBoard()
    val x = board.size
    val y = board[0].size
    for (i in 0 until x) {
        for (j in 0 until y) {
            // new board
            println("Testing: $i, $j")

            board = generateBoard()
            val previousPosisitions = mutableSetOf<Pos>()
            var guard = findGuard(board)
            if (placeObstacle(i, j, board)) {
                var guard = findGuard(board)
                while (!guard.escaped && !guard.stuck) {
                    // println("guard=$guard")
                    // if (i == 6 && j == 34) {
                    //     findGuard(board, true)
                    // }
                    guard = moveGuard(guard, previousPosisitions, board)
                }
                println("result: $guard")
                if (guard.stuck) {
                    accumulator++
                }
            }
        }
    }
    return accumulator
}

val part1 = part1()
val part2 = part2()

println("--------------------------------")
println("Part 1: $part1")
println("Part 2: $part2")
println("Done with day5/solve.kts")
