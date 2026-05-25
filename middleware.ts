// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // TODO: Re-enable auth guard
  void req
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/students/:path*", "/teachers/:path*"],
}
