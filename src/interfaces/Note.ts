export interface Note{
    id: number;
    title: string;
    content: string;
}

export interface NoteContextType {
    notes : Note[];
    getNotes: () => Promise<void>;
    createNote: (note: CreateNote) => Promise<void>;
    deleteNote: (id: number)=> Promise<void>;
}

export type CreateNote = Omit<Note, 'id'>