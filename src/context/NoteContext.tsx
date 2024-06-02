'use client'
import { createContext, useState, useContext} from "react"

interface Note{
    id: number;
    title: string;
    content: string;
}

interface createNote{
    title: string;
    content: string;
}

interface NoteContextType {
    notes : Note[];
    getNotes: () => Promise<void>;
    createNote: (note: createNote) => Promise<void>
}

export const NoteContext = createContext<NoteContextType>({
    notes: [],
    getNotes: async () => {},
    createNote: async () =>{}
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

        async function createNote(note: createNote) {
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

        return (
            <NoteContext.Provider value={{ notes, getNotes, createNote }}>
                {children}
            </NoteContext.Provider> 
        )
    }