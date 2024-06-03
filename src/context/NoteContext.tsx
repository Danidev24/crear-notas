'use client'
import { createContext, useState, useContext} from "react"
import { Note, CreateNote, NoteContextType } from '@/interfaces/Note'

export const NoteContext = createContext<NoteContextType>({
    notes: [],
    getNotes: async () => {},
    createNote: async (note: CreateNote) =>{},
    deleteNote: async (id: number) =>{}
})

export const useNotes = ()=>{
    const context = useContext(NoteContext)
    if(!context){
        throw new Error('useNotes must be used within a NotesProvider')
    }

    return context
}
export const NotesProvider = ({children}: {children: React.ReactNode})=>
    {
        const [notes,setNotes] = useState<Note[]>([])

        async function getNotes(){
            const res = await fetch('/api/notes')
            const data = await res.json()
            setNotes(data)
        }

        async function createNote(note: CreateNote) {
            const res = await fetch('/api/notes', {
                method: 'POST',
                body: JSON.stringify(note),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const newNote = await res.json()
            setNotes([...notes, newNote])
        }

        async function deleteNote(id:number){
            const res = await fetch(`http://localhost:3000/api/notes/${id}`,{
                method: 'DELETE',
            })
            const data = await res.json()
            setNotes(notes.filter((note)=> note.id != id))
        }

        return (
            <NoteContext.Provider value={{ notes, getNotes, createNote, deleteNote}}>
                {children}
            </NoteContext.Provider> 
        )
    }