import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess
import kotlin.math.pow
import java.math.BigInteger

// example result
// part 1 = 3749
// part 2 = ?
val exampleText = 
    """
    190: 10 19
    3267: 81 40 27
    83: 17 5
    156: 15 6
    7290: 6 8 6 15
    161011: 16 10 13
    192: 17 8 14
    21037: 9 7 18 13
    292: 11 6 16 20
    """.trimIndent()



val inputText = Files.readString(Path.of("input.txt"))
// val inputText = exampleText


fun <T> permutate(numPermutations: Int, baseValues: List<T>): List<List<T>> {
    val permutations = mutableListOf<List<T>>()
    
    repeat(2.toDouble().pow(numPermutations).toInt()) {
        var num = BigInteger.valueOf(it.toLong())
        // println("numPermutations = $numPermutations, it=$it, num=$num")

        val result = mutableListOf<T>().apply {
          repeat(numPermutations) { this.add(baseValues[0]) }
        }
    
        var pos = 0
        while (num > BigInteger.ZERO) {
            result[pos] = baseValues[num.mod(BigInteger(baseValues.size.toString())).toInt()]
            num /= BigInteger(baseValues.size.toString())
            pos++
        }

        permutations.add(result)
    }
    return permutations
}

typealias Op = (BigInteger, BigInteger) -> BigInteger
val plus: Op = { val1: BigInteger, val2: BigInteger -> val1 + val2 }
val mult: Op = { val1: BigInteger, val2: BigInteger -> val1 * val2 }
val ops = listOf<Op>(plus, mult)

var totalAccumulator = BigInteger("0")
inputText.lines().forEach {
    val result = BigInteger(it.split(":")[0])
    val values = it.split(":")[1].trim().split(' ').map { BigInteger(it) }

    val permutations = permutate(values.size - 1, ops)
    println("values=$values")

    var match = false
    run breaking@ {
        permutations.forEach { operations ->
            val operationsStack = operations.toMutableList()
            // println(operationsStack)
            val first = values[0]
            val rest = values.subList(1, values.size)
            // println("\nfirst=$first, rest=$rest")
            val testResult = rest.fold(first) { accumulator, thisValue -> 
                // println("accumulator=$accumulator, thisValue=$thisValue")
                val op = operationsStack.removeFirst()
                op(accumulator, thisValue)
            }
            if (result == testResult) {
                totalAccumulator += result
                return@breaking
            }
            // println("result=$result, testResult=$testResult")
        }
    }
    println("result=$result")
}

println("--------------------------------")
println("Part 1: $totalAccumulator")
// println("Part 2: $part2")
println("Done with day5/solve.kts")
