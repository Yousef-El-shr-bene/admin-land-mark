"use client";
import { Hind_Siliguri } from "next/font/google";
import { useEffect, useState } from "react";
import Crd from "./Crd";

const inter = Hind_Siliguri({
  subsets: ["latin-ext"],
  weight: "400",
});

export default function Home() {
  const [data, setdata] = useState([]);
  const [loding, setloding] = useState("");
  useEffect(() => {
    dataoutbot();
  }, []);

  async function dataoutbot() {
    setloding("loding...");
    let dd: any;
    await fetch("http://localhost:3000/api/gitforms", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.email,
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
      <div className="flex justify-center ">
        <div>{loding}</div>
        <div className="w-full h-auto flex flex-wrap ">
          {data.map((el: any, i): JSX.Element => {
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
