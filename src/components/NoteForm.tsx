'use client'
import { useState, useRef, useEffect } from "react"
import { useNotes } from "@/context/NoteContext"

export function NoteForm(){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const titleRef = useRef<HTMLInputElement>(null)

    const {createNote, selectedNote, setSelectedNote, updateNote} = useNotes()

    useEffect(()=>{
        if(selectedNote){
            setTitle(selectedNote.title)
            setContent(selectedNote.content || '')
        }
    }, [selectedNote])

    return(
        <form onSubmit={async (e) =>{
            e.preventDefault()
            if(selectedNote){
                await updateNote(selectedNote.id, {
                    title,
                    content
                })
                setSelectedNote(null)
            }else{
                await createNote({
                    title,
                    content
                })
            }
            setTitle('')
            setContent('')

            titleRef.current?.focus()
        }}>
            <input 
                type="text"
                name="title"
                autoFocus
                placeholder="Title"
                className="w-full px-4 py2 text-black bg.white rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
                ref={titleRef}
            />
            <textarea 
                name="content"
                placeholder="Content"
                className="w-full px-4 py2 text-black bg.white rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e)=> setContent(e.target.value)}
                value={content}
            ></textarea>

            <div className="flex justify-end gap-x-5">
                <button
                    className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!title || !content}
                    >
                    {
                        selectedNote ? "Update" : "Create"
                    }
                </button>
                {selectedNote &&(
                    <button
                        className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-400"
                        type="button"
                        onClick={()=>{
                            setSelectedNote(null)
                            setTitle('')
                            setContent('')
                        }}
                        >
                        Cancel
                    </button>
                )

                }
            </div>
        </form>
    )
}