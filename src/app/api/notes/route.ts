import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'

export async function GET(){

    const notes = await prisma.note.findMany()
    console.log(notes)
    return NextResponse.json(notes)
}


export async function POST(request: Request){

    const {title, content} = await request.json()

    const newNote = await prisma.note.create({
        data:{
            title,
            content
        }
    })

    return NextResponse.json(newNote)
}