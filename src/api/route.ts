import { createClient } from "@/utils/supabase/client";
import { NextRequest } from "next/server";

const supabase = createClient()


export async function GET(){
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

    return puzzle
}