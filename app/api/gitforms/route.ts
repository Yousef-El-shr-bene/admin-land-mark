import { gitdata } from "../../../firebase";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const em = await request.json();
  let data2: any[] = [];
  await gitdata().then(async (data: any): Promise<void> => {
    await data.map(
      (arr: { data: () => { (): any; new (): any; email: any }; id: any }) => {
        if (em.email === "mena@lm.com") {
          data2.push({ ...arr.data(), id: arr.id });
        } else if (arr.data().email === em.email) {
          data2.push({ ...arr.data(), id: arr.id });
        }
      }
    );
  });

  return NextResponse.json({ data: data2 });
}
