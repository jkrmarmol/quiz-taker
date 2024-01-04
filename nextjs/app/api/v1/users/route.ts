import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return Response.json({ message: 'Hello World' })
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ error: err.message })
    }
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    return Response.json({ message: 'Hello World' })
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ error: err.message })
    }
  }
}
