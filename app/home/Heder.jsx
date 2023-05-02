"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Heder() {
  const router = useRouter();
  const [druphedr , setdruphedr] = useState(<></>)
  useEffect(() => {
    if (!localStorage.uid) {
      router.puch("/")
    }
    if (localStorage.uid === "TJJAldJBw8PMO633BH15TL7v88w2") {
      setdruphedr(<>
      <div>
      <Link
          className="bg-slate-500 p-1 hover:bg-slate-400 text-white "
          href="/home/addUser"
        > 
           new user 
        </Link>
      </div>
      </>)
    }
  }, [])
  
  function out() {
    localStorage.removeItem("uid")
    localStorage.removeItem("email")
    router.push("/")
  }
  return (
    <>
    <header className="w-full bg-slate-100 drop-shadow flex justify-around items-center h-20  ">
      <h1 className="bg-teal-200 rounded-lg p-2">
        {localStorage.email}
      </h1>
      <div className="flex">
        <Link
          className="bg-slate-500 m-1 p-1 rounded hover:bg-slate-400 text-white "
          href="/form"
        >
          Add data
        </Link>
        <Link
          className="bg-slate-500 m-1 p-1 rounded hover:bg-slate-400 text-white "
          href="/home"
        > 
          preview data
        </Link>
        <h1
          className="bg-slate-500 m-1 p-1 rounded hover:bg-slate-400 text-white "
          onClick={out}
        > 
          log out
        </h1>
      </div>
    </header>
    <div>
      {druphedr}
    </div>
    </>
  );
}
