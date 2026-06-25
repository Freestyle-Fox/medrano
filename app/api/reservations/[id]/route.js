import connectDB from '@/lib/mongodb'
import Reservation from '@/models/Reservation'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const body = await request.json()
    const reservation = await Reservation.findByIdAndUpdate(params.id, body, { new: true })
    if (!reservation) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(reservation)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    await Reservation.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
