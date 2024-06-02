'use client'
import { NoteForm } from "@/components/NoteForm";
import './globals.css'
import { useEffect} from "react"
import { useNotes } from "@/context/NoteContext";


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
          <div 
            key={note.id}
            className="bg-slate-400 p-4 my-2">
            <p>#{note.id}</p>
            <h2>title: {note.title}</h2>
            <h2>content: {note.content}</h2>
          </div>
        ))
        }
      </div>
    </div>
  );
}
