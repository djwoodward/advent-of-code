import java.nio.file.Files
import java.nio.file.Path

val text = Files.readString(Path.of("input.txt"))

val mulRegex = Regex("mul\\((\\d{1,3}),(\\d{1,3})\\)")

val result = mulRegex.findAll(text).fold(0) { acc, i -> acc + i.groupValues[1].toInt() * i.groupValues[2].toInt() }
println("result = ${result}")

