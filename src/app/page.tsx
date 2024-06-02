import { NoteForm } from "@/components/NoteForm";
import './globals.css'

interface Note {
  id: number;
  title: string;
  content: string
}
async function getNotes(): Promise<Note[]>{
  const notes = await fetch('http://localhost:3000/api/notes')
  const data = await notes.json()
  return data
}
export default async function Home() {
  const notes: Note[] = await getNotes();
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NoteForm />
        {notes.map((note: Note)=>(
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
