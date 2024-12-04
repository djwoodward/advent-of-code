import java.nio.file.Files
import java.nio.file.Path

// 18 XMAS
// 9 X-MAS
// val text = """
//         MMMSXXMASM
//         MSAMXMSMSA
//         AMXSXMAAMM
//         MSAMASMSMX
//         XMASAMXAMM
//         XXAMMXXAMA
//         SMSMSASXSS
//         SAXAMASAAA
//         MAMMMXMMMM
//         MXMXAXMASX
//     """.trimIndent()
val text = Files.readString(Path.of("input.txt"))

// idea, scan 
val result: Array<Array<Char>> = text.lines().map {
    it.toCharArray().toTypedArray()
}.toTypedArray()

val rows = result.size
val cols = result[0].size

fun isChar(result: Array<Array<Char>>, i: Int, j: Int, c: Char): Boolean {
    return result.getOrNull(i)?.getOrNull(j) == c
}

fun isXmas(result: Array<Array<Char>>, xi: Int, xj: Int, mi: Int, mj: Int, ai: Int, aj: Int, si: Int, sj: Int): Boolean {
    return isChar(result, xi, xj, 'X') && isChar(result, mi, mj, 'M') && isChar(result, ai, aj, 'A') && isChar(result, si, sj, 'S')
}

fun isMas(result: Array<Array<Char>>, ai: Int, aj: Int, uli: Int, ulj: Int, uri: Int, urj: Int, dli: Int, dlj: Int, dri: Int, drj: Int): Boolean {
    // if the center is an 'A', look for 'M' and 'S' in the 4 corner directions
    return isChar(result, ai, aj, 'A') 
        && (
            // MAS or SAM from top-left to bottom-right
            isChar(result, uli, ulj, 'M') && isChar(result, dri, drj, 'S') || isChar(result, uli, ulj, 'S') && isChar(result, dri, drj, 'M')
        ) 
        && (
            // MAS or SAM from top-right to bottom-left
            isChar(result, uri, urj, 'M') && isChar(result, dli, dlj, 'S') || isChar(result, uri, urj, 'S') && isChar(result, dli, dlj, 'M')
        ) 
}

println("Data loaded - rows: $rows, cols: $cols")

var xmasAccumulator = 0
var masxAccumulator = 0
for (i in 0 until rows) {
    for (j in 0 until cols) {
        // look in all 8 directions to see if it completes XMAS
        // up
        if (isXmas(result, i, j, i-1, j, i-2, j, i-3, j)) {
            xmasAccumulator++
        }
        // up-right
        if (isXmas(result, i, j, i-1, j+1, i-2, j+2, i-3, j+3)) {
            xmasAccumulator++
        }
        // right
        if (isXmas(result, i, j, i, j+1, i, j+2, i, j+3)) {
            xmasAccumulator++
        }
        // down-right
        if (isXmas(result, i, j, i+1, j+1, i+2, j+2, i+3, j+3)) {
            xmasAccumulator++
        }
        // down
        if (isXmas(result, i, j, i+1, j, i+2, j, i+3, j)) {
            xmasAccumulator++
        }
        // down-left
        if (isXmas(result, i, j, i+1, j-1, i+2, j-2, i+3, j-3)) {
            xmasAccumulator++
        }
        // left
        if (isXmas(result, i, j, i, j-1, i, j-2, i, j-3)) {
            xmasAccumulator++
        }
        // up-left
        if (isXmas(result, i, j, i-1, j-1, i-2, j-2, i-3, j-3)) {
            xmasAccumulator++
        }

        // look in 4 diaganol directions to see if its "X-MAS"
        if (isMas(result, i, j, i-1, j-1, i-1, j+1, i+1, j-1, i+1, j+1)) {
            masxAccumulator++
        }

        // print("($i,$j)${result[i][j]} ")
        // println("accumulator: $accumulator")
    }
}
println("XMAS Count: $xmasAccumulator")
println("X-MAS Count: $masxAccumulator")


println("\nDone with day4/solve.kts")

