import { signingInWithEmailAndPassword } from "../../../firebase";
import { NextResponse ,NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const data = await request.json()
  const re: any = await signingInWithEmailAndPassword([
    data.username,
    data.password,
  ]);
  if (re.code) {
    return NextResponse.json({ error: re.code });
  } else {
    return NextResponse.json({ re });
  }

  // return  new Response('Hello, Next.js!')
}
