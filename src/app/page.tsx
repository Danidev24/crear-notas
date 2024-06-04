'use client'
import './globals.css'
import { NoteForm } from "@/components/NoteForm";
import { useEffect} from "react"
import { useNotes } from "@/context/NoteContext";
import { NoteCard } from '@/components/noteCard'

export default function Home() {

  const {notes, getNotes} = useNotes()

  useEffect(()=>{
    getNotes()
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg">
        <NoteForm />
        <div className="mt-4 h-96 overflow-y-auto custom-scrollbar px-4">
          {notes.map((note)=>(
            <NoteCard note={note} key={note.id}/>
          ))
          }  
        </div>
      </div>
    </div>
  );
}
