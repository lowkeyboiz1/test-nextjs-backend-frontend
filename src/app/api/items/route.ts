import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

const DATABASE_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME
const COLLECTION_NAME = "items"

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db(DATABASE_NAME)
    console.log({ db })
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const result = await db.collection(COLLECTION_NAME).insertOne({ name })

    return NextResponse.json({ id: result.insertedId, name }, { status: 201 })
  } catch (error) {
    console.error("Error adding item:", error)
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  console.log("GET request received", request)
  const client = await clientPromise
  const db = client.db(DATABASE_NAME)
  const items = await db.collection(COLLECTION_NAME).find().toArray()
  return NextResponse.json(items)
}
