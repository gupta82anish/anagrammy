
import React from 'react';
import { Puzzle } from './Puzzle';

export type PuzzleProps = {
	wordIndex: number
  puzzle: Puzzle;
  correct: boolean;
};

type SquareProps = {
  alphabet: string;
  targetIndex: number;
  currentIndex: number;
  correct: boolean;
};

function PuzzleRow({ wordIndex, puzzle, correct }: PuzzleProps) {
    const { jumble, answer } = puzzle;
  
    // Use a map to track occurrences of each letter in `jumble`
    const jumbleTracker: Record<string, number[]> = {};
    jumble.split('').forEach((letter, index) => {
      if (!jumbleTracker[letter]) {
        jumbleTracker[letter] = [];
      }
      jumbleTracker[letter].push(index);
    });
  
    // Map the target positions correctly, accounting for duplicates
    const targetPositions: number[] = [];
    const usedIndices: Record<string, number> = {};
  
    answer.split('').forEach((letter) => {
      if (!usedIndices[letter]) {
        usedIndices[letter] = 0;
      }
      const index = jumbleTracker[letter][usedIndices[letter]]; // Get the next unused index
      targetPositions.push(index);
      usedIndices[letter] += 1; // Move to the next occurrence
    });
  
    return (
      <div className="flex flex-row gap-4 items-center justify-center relative">
        {jumble.split('').map((alphabet, index) => {
          const targetIndex = targetPositions.indexOf(index); // Get the correct position
          return (
            <Square
              key={index}
              alphabet={alphabet}
              targetIndex={targetIndex}
              currentIndex={index}
              correct={correct}
            />
          );
        })}
      </div>
    );
  }
  

function Square({
  alphabet,
  targetIndex,
  currentIndex,
  correct,
}: SquareProps) {
  // Calculate the sliding distance
  const slideDistance = correct ? (targetIndex - currentIndex) * 56 : 0;

  return (
    <div
      className="bg-purple-950 h-10 w-10 relative transition-transform duration-700"
      style={{
        transform: `translateX(${slideDistance}px)`,
      }}
    >
      <span className="flex h-full capitalize justify-center items-center text-white font-bold text-2xl">
        {alphabet}
      </span>
    </div>
  );
}

export default PuzzleRow;
