import { Puzzle, Sentence } from "@/components/Puzzle";


export function wordToPuzzle(puzzle: string, category: string): {sentence: Sentence, category: string} {

    if(checkIfSentenceOrWord(puzzle)) {
        const words = puzzle.split(' ');
        const sentence: Puzzle[] = words.map((word) => {
            return {
                jumble: jumbleWord(word),
                answer: word
            }
        })
        return {sentence: {word: sentence}, category: category}
    } else {
        return {sentence: {word: [{
            jumble: jumbleWord(puzzle),
            answer: puzzle
        }]}, category: category}
    }

}

function checkIfSentenceOrWord(word: string): boolean {
    return word.includes(' ');
}

function jumbleWord(word: string): string {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}