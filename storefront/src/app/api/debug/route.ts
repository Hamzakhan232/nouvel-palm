import { listFragrances } from "@lib/data/fragrances"
import { NextResponse } from "next/server"

export async function GET() {
  const data = await listFragrances()
  return NextResponse.json({ 
    data, 
    publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "missing",
    backendUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "missing"
  })
}
