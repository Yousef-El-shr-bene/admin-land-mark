import { deleteform } from "../../../firebase";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const id = await request.json();
  deleteform(id.id);

  return new Response("ok");
}
