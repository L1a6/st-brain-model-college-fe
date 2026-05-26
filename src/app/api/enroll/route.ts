import { proxyAuthRequest } from '../auth/_proxy'

export async function POST(req: Request) {
  return proxyAuthRequest(req, '/enroll')
}