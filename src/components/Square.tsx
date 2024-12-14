import React from 'react'

type PuzzleProps = {
    puzzle: {
        jumble: string
        answer: string
    }
}

type SquareProps = {
    alphabet: string
}

function PuzzleRow({ puzzle }: PuzzleProps) {
    return (
        <div className='flex flex-row gap-4 items-center justify-center'>
            {
                puzzle.jumble.split('').map((alphabet, index) => (
                    <Square key={index} alphabet={alphabet} />
                ))
            }
        </div>
    )
}

function Square({ alphabet }: SquareProps) {
  return (
    <div className='bg-purple-950 h-10 w-10'>
        <span className='flex h-full justify-center items-center text-white font-bold text-2xl'>
            {alphabet}
        </span>
    </div>
  )
}

export default PuzzleRow