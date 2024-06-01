import { NextResponse } from "next/server";



export function GET(){
    return NextResponse.json({
        message: 'getting only note'
    })
}


export function DELETE(){
    return NextResponse.json({
        message: 'deleting single note'
    })
}

export function PUT(){
    return NextResponse.json({
        message: 'updating single note...'
    })
}