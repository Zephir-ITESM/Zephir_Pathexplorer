import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()

  // Clear all auth cookies
  cookieStore.delete("auth_token")
  cookieStore.delete("refresh_token")
  cookieStore.delete("user_type")
  cookieStore.delete("user_id")
  cookieStore.delete("session_id")

  return NextResponse.json({ success: true })
}
