'use client'
import { createContext, useState, useContext} from "react"
import { CreateNote, UpdateNote } from '@/interfaces/Note'
import {Note} from '@prisma/client'

export const NoteContext = createContext<{
    notes: Note[];
    getNotes: ()=> Promise<void>;
    createNote: (note: CreateNote) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    selectedNote: Note | null;
    setSelectedNote: (note: Note|null) => void;
    updateNote: (id: number, note: UpdateNote) => Promise<void>;
}>({
    notes: [],
    getNotes: async () => {},
    createNote: async (note: CreateNote) =>{},
    deleteNote: async (id: number) => {},
    selectedNote: null,
    setSelectedNote: (note: Note | null) => {},
    updateNote: async (id: number, note: UpdateNote) => {}
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
        const [selectedNote, setSelectedNote] = useState<Note | null>(null)

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

        async function updateNote(id: number, note : UpdateNote ){
            const res = await fetch(`http://localhost:3000/api/notes/${id}`,{
                method: 'PUT',
                body: JSON.stringify(note),
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })

            const response = await res.json()
            const noteUpdate = response.data;
            setNotes(notes.map((n)=>(n.id === id ? noteUpdate : n)))            
        }

        return (
            <NoteContext.Provider value={{ 
                notes, getNotes, createNote, deleteNote, selectedNote, setSelectedNote, updateNote
            }}>
                {children}
            </NoteContext.Provider> 
        )
    }