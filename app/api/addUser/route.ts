import { type } from "os";
import {
  signingInWithEmailAndPassword,
  createUserWithEmailAndPasswordd,
} from "../../../firebase";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const data = await request.json();
  const re: any = await createUserWithEmailAndPasswordd([
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
