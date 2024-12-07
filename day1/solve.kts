import java.nio.file.Files
import java.nio.file.Path


// example result
// part 1 = 11
// part 2 = ?
val exampleText = 
    """
3   4
4   3
2   5
1   3
3   9
3   3
    """.trimIndent()


val inputText = Files.readString(Path.of("input.txt"))
// val inputText = exampleText

val leftList = mutableListOf<Int>()
val rightList = mutableListOf<Int>()
inputText.lines().forEach {
    leftList.add(it.split("   ")[0].toInt())
    rightList.add(it.split("   ")[1].toInt())
}

leftList.sort()
rightList.sort()

var accumulator1 = 0
var accumulator2 = 0
leftList.forEachIndexed { i, v ->
    val appearances = rightList.count { it == v}
    accumulator2 += v * appearances
    accumulator1 += Math.abs(leftList[i] - rightList[i])
}

println("--------------------------------")
println("Result part 1: $accumulator1")
println("Result part 2: $accumulator1")
println("Done with day5/solve.kts")

