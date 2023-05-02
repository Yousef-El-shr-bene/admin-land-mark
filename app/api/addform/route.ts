import { addform } from '../../../firebase'
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const form = await request.json()
  
  await addform(form.ApartmentData ,form.Feedback , form.customerName ,form.email ,form.phoneNumber , form.sell === "true" ? true : false ,form.uid)

  
  return  NextResponse.json("ok")
}
