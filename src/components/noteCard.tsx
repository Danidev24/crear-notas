import React from 'react'
import { Note } from '@prisma/client'
import { useNotes } from '@/context/NoteContext'

export function NoteCard({note}: {note:Note}) {

    const {deleteNote, setSelectedNote} = useNotes()
    
  return (
    <div key={note.id} className="bg-slate-400 p-4 my-2 flex justify-between">
        <div>
            <h2 className='text-2xl font-bold'>title: {note.title}</h2>
            <p>{note.content}</p>
        </div>
        <div className="flex gap-x-2">
            <button
                onClick={()=> {
                    if(confirm('Are you sure you want to delete this note ? ')){
                        deleteNote(Number(note.id))
                    }
                }}>
                Delete</button>
            <button
                onClick={()=>{
                    setSelectedNote(note)
                }}
            >Edit</button>
        </div>
    </div>
  )
}

export default NoteCard
