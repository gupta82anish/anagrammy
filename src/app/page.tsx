"use client"
import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";
import ThePuzzle, { Sentence } from "@/components/Puzzle";
import { wordToPuzzle } from "@/helpers/functions";
import { GET } from "@/api/route";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";


export default function Home() {
  const [sentence, setSentence] = useState<Sentence>({word: []})
  const [category, setCategory] = useState<string>('')

  const getNewPuzzle = async () => {
    const puzzle = await GET();
    const {sentence, category} = wordToPuzzle(puzzle.puzzle, puzzle.category)
    setSentence(sentence)
    setCategory(category)
    return {sentence, category}
  }

  useEffect(() => {
    const fetchPuzzle = async () => {
      const {sentence, category} = await getNewPuzzle()
    }
    fetchPuzzle();
  }, [])




  return (
    <ThePuzzle puzzle={sentence} category={category} getNewPuzzle={getNewPuzzle}/>
  )
}
