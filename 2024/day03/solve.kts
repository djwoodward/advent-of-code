import java.nio.file.Files
import java.nio.file.Path

val text = Files.readString(Path.of("input.txt"))

// The mul(a,b) instruction multiplies the value, assuming a,b are both 1-3 digit integers.
// The do() instruction enables future mul instructions.
// The don't() instruction disables future mul instructions.

val mulRegex = Regex("mul\\((\\d{1,3}),(\\d{1,3})\\)|do\\(\\)|don't\\(\\)")

var accumulator = 0
var isOn = true
mulRegex.findAll(text).map({ it.value }).forEach { token ->
    if (token == "do()") {
        isOn = true
    } else if (token == "don't()") {
        isOn = false
    } else if (isOn) {
        val (a, b) = token.replace(Regex("[^\\d,]"), "").split(',').map { it.toInt() }
        accumulator += a * b
    }
}

println("result = ${accumulator}")

