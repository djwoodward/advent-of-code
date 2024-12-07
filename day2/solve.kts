import java.nio.file.Files
import java.nio.file.Path


// example result
// part 1 = 2
// part 2 = ?
val exampleText = 
    """
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
    """.trimIndent()


val inputText = Files.readString(Path.of("input.txt"))
// val inputText = exampleText

val inputLists: List<List<Int>> = inputText.lines().map {
    // println("it=$it")
    // val split = it.split(" ")
    // println("it=$split")
    it.split(" ").map { it.toInt() }
}

var accumulator1 = 0
var accumulator2 = 0

fun isSafe(inputList: List<Int>): Boolean {
    var increasing = inputList[0] < inputList[1]
    if (inputList[0] == inputList[1]) {
        increasing = inputList[1] < inputList[2]
        if (inputList[1] == inputList[2]) {
            increasing = inputList[2] < inputList[3]
            if (inputList[2] == inputList[3]) {
                throw Exception("4 numbers equal at the start")
            }
        }
    }

    inputList.forEachIndexed { i, v ->
        val thisNum = v
        val nextNum = if (i+1 >= inputList.size) null else inputList[i+1]
        
        // check direction is correct increasing/decreasing
        if (nextNum != null) {
            var thisUnsafe = false
            if (increasing && nextNum <= thisNum || !increasing && nextNum > thisNum) {
                println("  i=$i, thisNum=$thisNum, nextNum=$nextNum, increasing=$increasing")
                return false
            }
            val diffNext = Math.abs(thisNum - nextNum)
            if (diffNext == 0 || diffNext > 3) {
                println("  i=$i, thisNum=$thisNum, nextNum=$nextNum, diffNext=$diffNext")
                return false
            }
        }
    }
    return true
}

inputLists.forEach { inputList ->
    println("-----")
    var safe = isSafe(inputList)
    var safeish = safe
    if (!safe) {
        run breaking@ {
            repeat(inputList.size) { index ->
                val listWithOneRemoved = inputList.toMutableList()
                listWithOneRemoved.removeAt(index)
                safeish = isSafe(listWithOneRemoved)
                if (safeish) {
                    // println("safish: listWithOneRemoved=$listWithOneRemoved")
                    return@breaking
                }
            }
        }
    }
    println("inputList=$inputList, safe=$safe")
    if (safe) {
        accumulator1++
    }
    if (safeish) {
        accumulator2++
    }
}

println("--------------------------------")
println("Result part 1 (2 / 463): $accumulator1")
println("Result part 2 (4 / > 498, < 1000, !602): $accumulator2")
println("Done with day5/solve.kts")

