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
      <div>
        <NoteForm />
        {notes.map((note)=>(
          <NoteCard note={note} key={note.id}/>
        ))
        }
      </div>
    </div>
  );
}
