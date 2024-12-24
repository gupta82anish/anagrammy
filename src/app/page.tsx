import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";
import ThePuzzle from "@/components/Puzzle";
import { wordToPuzzle } from "@/helpers/functions";


export default async function Home() {

  const cookieStore = await cookies()
  const supabase = createClient()

  const { count } = await supabase
    .from('puzzles')
    .select('id', { count: 'exact', head: true })

  const randomIndex = Math.floor(Math.random() * (count ?? 1))

  const { data: puzzle, error } = await supabase
    .from('puzzles')
    .select('*')
    .limit(1)
    .range(randomIndex, randomIndex)
    .single()

  if (error) {
    console.error('Error fetching puzzle:', error)
    // Provide a default puzzle if there's an error
    return { word: 'default', hint: 'fallback puzzle' }
  }


  const {sentence, category} = wordToPuzzle(puzzle.puzzle, puzzle.category)


  return (
    <ThePuzzle puzzle={sentence} category={category} />
  )
}
