import java.nio.file.Files
import java.nio.file.Path
import kotlin.system.exitProcess

// example result
// part 1 = 143
// part 2 = 123
val exampleText = 
"""47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
"""

// val inputText = exampleText
val inputText = Files.readString(Path.of("input.txt"))

// parse the rules and printing orders
var ruleLines = true
val rules = mutableListOf<Pair<Int, Int>>()
val printingOrders = mutableListOf<List<Int>>()
inputText.lines().forEach {
    if (it.isBlank()) {
        ruleLines = false
    } else {
        if (ruleLines) {
            val rulePairList = it.split("|").map { it.toInt() }
            rules.add(Pair(rulePairList[0], rulePairList[1]))
        } else {
            printingOrders.add(it.split(",").map { it.toInt() })
        }
    }
}



// debug print both rules and printing orders
rules.forEach { (before, after) ->
    println("Rule: $before -> $after")
}
printingOrders.forEach { printingOrder ->
    println("Printing order: $printingOrder")
}


// maps every page to a list of all pages that come after it
val pageOrder = mutableMapOf<Int, MutableList<Int>>()
// parse the rules into a full list of pages mapped to their following pages
val rulesMap = rules.forEach { (before, after) ->
    pageOrder.getOrPut(before) { mutableListOf() }.add(after)
    pageOrder.getOrPut(after) { mutableListOf() }
}
pageOrder.forEach { (key, value) ->
    println("$key -> $value")
}

var accumulator = 0
var accumulator2 = 0
// Oof this is inefficient
printingOrders.forEach { printingOrder ->
    val sortedOrder = mutableListOf<Int>()
    println("--------------------------------")
    println("Original order: $printingOrder")
    printingOrder.forEach { page ->
        // loop over current to find index to insert
        val mustComeAfter = pageOrder[page]!!
        var index = sortedOrder.size
        run breaking@ {
            sortedOrder.forEachIndexed { thisIndex, value ->
                if (value in mustComeAfter) {
                    // println("   $thisIndex - $value is in ($page -> $mustComeAfter)")
                    index = thisIndex
                    return@breaking
                } else {
                    // println("   $thisIndex - $value is not in ($page -> $mustComeAfter)")
                }
            }
        }
        // println("   adding $page at $index")
        sortedOrder.add(index, page)
        // println("   Sorted Order:   $sortedOrder")
    }
    println("Sorted Order:   $sortedOrder")
    val matches = printingOrder == sortedOrder
    if (matches) {
        accumulator += printingOrder[printingOrder.size/2]
    } else {
        accumulator2 += sortedOrder[sortedOrder.size/2]
    }
}

println("--------------------------------")
println("Part 1: $accumulator")
println("Part 2: $accumulator2")
println("Done with day5/solve.kts")
