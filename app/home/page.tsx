"use client";
import cookie from "js-cookie";
import { Hind_Siliguri } from "next/font/google";
import { useEffect, useState } from "react";
import Crd from "./Crd";
import { useRouter } from "next/navigation";
const inter = Hind_Siliguri({
  subsets: ["latin-ext"],
  weight: "400",
});

export default function Homepage(): JSX.Element {
  const [data, setdata] = useState([]);
  const [loding, setloding] = useState("");
  const [serch , setserch] = useState("")  ;
  const rout = useRouter();
  function serching(i: any) {
    console.log(i.email);
    console.log(i.email.toLowerCase());
    console.log(i.email.toLowerCase().includes(serch.toLocaleLowerCase));
    console.log();
    if (
      serch.toLowerCase() === "" ||
      i.email.toLowerCase().includes(serch.toLocaleLowerCase()) ||
      i.customerName.toLowerCase().includes(serch.toLocaleLowerCase()) ||
      i.phoneNumber.toLowerCase().includes(serch.toLocaleLowerCase()) ||
      i.Feedback.toLowerCase().includes(serch.toLocaleLowerCase())
    ) {
      return  i;
    }else{
      console.log(false);
      return  false
      
    }

    
    

  }
  useEffect(() => {
    if (cookie.get("email") !== undefined) {
      dataoutbot();
    } else {
      rout.push("/");
    }
  }, [rout]);

  async function dataoutbot() {
    setloding("loding...");
    let dd: any;
    await fetch("/api/gitforms", {
      method: "POST",
      body: JSON.stringify({
        email: cookie.get("email"),
      }),
    }).then(async (d) => {
      const thedata = await d.json();
      dd = thedata;
    });
    setdata(dd.data);
    setloding("");
  }

  return (
    <>
      <div className="flex flex-col justify-center ">
        <div></div>
        <input
          type="text"
          placeholder="serch"
          className="w-full border-2 border-black"
          onChange={(e) => {
            setserch(e.target.value);
          }}
        />
        <div>{loding}</div>
        <div className="w-full h-auto flex flex-wrap ">
          {data.filter(serching).map((el: any, i): JSX.Element => {
            return (
              <Crd
                customerName={el.customerName}
                email={el.email}
                feedback={el.Feedback}
                phoneNumber={el.phoneNumber}
                sell={el.sell === true ? "sell" : "rent"}
                time={el.time}
                key={i}
                id={el.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
