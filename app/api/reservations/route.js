import connectDB from '@/lib/mongodb'
import Reservation from '@/models/Reservation'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const reservations = await Reservation.find().sort({ createdAt: -1 })
    return NextResponse.json(reservations)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    const reservation = await Reservation.create(body)
    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
