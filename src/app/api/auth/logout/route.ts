import { NextResponse } from "next/server"
import { proxyAuthRequest } from "../_proxy"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  // 1. Get cookies
  const cookieStore = await cookies()
  const session_id = cookieStore.get("session_id")?.value
  const user_id = cookieStore.get("user_id")?.value

  let data: unknown = null

  if (session_id && user_id) {
    const incomingBody = await req.json().catch(() => ({}))

    const backendResponse = await proxyAuthRequest(
      new Request(req, {
        method: "POST",
        body: JSON.stringify({
          ...incomingBody,
          session_id,
          user_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      "/auth/logout"
    )

    data = await backendResponse.json().catch(() => null)
  }

  const response = NextResponse.json(data ?? { message: "Logout successful" }, { status: 200 })

  response.cookies.delete("access_token")
  response.cookies.delete("refresh_token")
  response.cookies.delete("session_id")
  response.cookies.delete("user_id")

  return response
}
