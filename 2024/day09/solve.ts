import { print, println, partition, swapArrayItems } from '../ts-common/common.ts'

const inputData = await Deno.readTextFile('input.txt')
const inputChars = inputData.split('')

type Block = {pos: number, id?: number }

function toString(blocks: Block[]) {
    let str = ""
    blocks.slice(0, 42).forEach(b => {
        str +=b.id != undefined ? b.id.toString() : '.'
    })
    return str
}

function getBlocks(): Block[] {
    const blocks: Block[] = []
    let blockId = 0
    let pos = 0
    for (let i = 0; i < inputData.length; i += 2) {
        const blockSize = parseInt(inputChars[i])
        const freeSpace = parseInt(inputChars[i+1])
        for (let b = 0; b < blockSize; b++) {
            blocks.push({id: blockId, pos: pos})
            pos++
        }
        for (let f = 0; f < freeSpace; f++) {
            blocks.push({pos: pos})
            pos++
        }
        blockId++
    }
    return blocks
}

function fragment(original: Block[]): Block[] {
    const blocks = JSON.parse(JSON.stringify(original))
    let ptrFront = -1
    let ptrBack = blocks.length
    while (ptrFront < ptrBack) {
        // find first empty block
        let frontBlock 
        do {
            ptrFront++
            frontBlock = blocks[ptrFront]
        } while (frontBlock.id != undefined)
    
        // find last file block
        let backBlock
        do {
            ptrBack-- 
            backBlock = blocks[ptrBack]
        } while (backBlock.id == undefined)
    
        if (ptrFront < ptrBack) {
            // println(`front=${ptrFront}, back=${ptrBack}`)
            frontBlock.id = backBlock.id
            backBlock.id = undefined
            // println(toString(blocks))
        } else {
            // println("done looping")
        }
    }
    return blocks
}

function calculateChecksum(blocks: Block[]): number {
    return blocks.reduce((acc: number, currValue: Block, i: number) => {
        if (currValue.id == undefined) {
            return acc
        }
        // println(`i=${i}, pos=${currValue.pos}, id=${currValue.id}`)
        return acc += i * currValue.id
    }, 0);
}

function getBlockGroups(blocks: Block[]): Block[][] {
    return blocks.reduce((acc: Block[][], currValue: Block, i: number) => {
        currValue.pos = i
        const currentBlockType = acc[acc.length -1] || []
        if (currentBlockType[0]?.id == currValue.id) {
            currentBlockType.push(currValue)
        } else {
            acc.push([currValue])
        }
        return acc
    }, []);
}

function moveWholeFiles(original: Block[]): Block[] {
    const blocks = JSON.parse(JSON.stringify(original)) as Block[]

    new Set(blocks.filter(b => b.id != undefined))
    const blockIds = Array.from(new Set(blocks.map(b => b.id).filter(i => i != undefined))).reverse()
    // println(JSON.stringify(blockIds))
    
    blockIds.forEach(blockId => {
        const blockGroups = getBlockGroups(blocks)
        const blockToMove = blockGroups.find(b => b[0].id == blockId)
        if (blockToMove) {
            const emptyBLock = blockGroups.find(g => g.length >= blockToMove.length && g[0].id == undefined && g[0].pos <= blockToMove[0].pos)
            if (emptyBLock) {
                // println(`last=${toString(last)}`)
                // println(`first=${toString(first)}`)
                let startDest = emptyBLock[0].pos
                let startSource = blockToMove[0].pos
                for (let i = 0; i < blockToMove.length; i++) {
                    swapArrayItems(blocks, startDest + i, startSource + i)
                    // println(`last = ${last[i].id}/${last[i].pos}`)
                }
                // println(toString(blocks))
                return true
            }
        }

        // println(JSON.stringify(blockToMove))
        // blockGroups.find(g => g.length >= fileBlock.length && g[0].id == undefined && g[0].pos <= fileBlock[0].pos)
    })

    // println(toString(blocks))
    return blocks
}

println("getting blocks...")
const blocks = getBlocks()
println("fragmenting blocks...")
const fragmented = fragment(blocks)
println("generating checksum...")
const checksum = calculateChecksum(fragmented)
println("moving blocks in whole...")
const afterMoved = moveWholeFiles(blocks)
println("generating checksum...")
const checksum2 = calculateChecksum(afterMoved)

println('--- Part 1 ---------')
println(`original =  ${toString(blocks)}`)
println('example  =  0099811188827773336446555566..............')
println(`answer   =  ${toString(fragmented)}`)
println(`part1 (1928) = ${checksum}`)
println('--- Part 2 ---------')
println(`original =  ${toString(blocks)}`)
println('example  =  00992111777.44.333....5555.6666.....8888..')
println(`answer   =  ${toString(afterMoved)}`)
println(`part2 (2858) = ${checksum2}`)
println('-------------------')
println(`Done with Day 9`)
