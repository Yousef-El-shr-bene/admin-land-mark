import { signingInWithEmailAndPassword ,createUserWithEmailAndPasswordd } from '../../../firebase'
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  // console.log( await request.json());
  const  data  = await request.json()
  const re = await createUserWithEmailAndPasswordd([data.username,data.password])
  if (re.code) {
    console.log("error",[data.username,data.password]);
    return NextResponse.json({error : re.code})
  }else{
    console.log("no error",[data.username,data.password]);
    return NextResponse.json({re})
  }

  
  // return  new Response('Hello, Next.js!')
}
