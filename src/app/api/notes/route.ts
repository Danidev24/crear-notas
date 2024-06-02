import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'

export async function GET(){
    try{
        const notes = await prisma.note.findMany()
        return NextResponse.json(notes)
    }catch(error){
        if(error instanceof Error){
            return NextResponse.json(
            {
                messsage: error.message
            },{
                status: 500,
            })
        }
    }
    
}


export async function POST(request: Request){

    try{
        const {title, content} = await request.json()

        if(!title){
            return NextResponse.json({
                message: 'Title is required'
            })
        }

        const newNote = await prisma.note.create({
            data:{
                title,
                content
            }
        })

        return NextResponse.json(newNote)
    }catch(error){
        if(error instanceof Error){
            if(error)
            return NextResponse.json({
                message: error.message
            },
            {
               status: 500 
            })
        }
    }
}