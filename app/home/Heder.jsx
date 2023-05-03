"use client";
import cookie from 'js-cookie'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Heder() {
  const em = cookie.get("email")
  const router = useRouter();
  const [druphedr, setdruphedr] = useState(<></>);
  useEffect(() => {
    if (cookie.get("uid") === undefined) {
      router.push("/");
    }
    if (cookie.get("uid") === "TJJAldJBw8PMO633BH15TL7v88w2") {
      setdruphedr(
        <>
          <div>
            <Link
              className="bg-slate-500 p-1 hover:bg-slate-400 text-white "
              href="/home/addUser"
            >
              new user
            </Link>
          </div>
        </>
      );
    }
  }, [router]);

  function out() {
    cookie.remove("uid")
    cookie.remove("email");
    router.push("/");
  }
  console.log(em);
  return (
    <>
      <header className="w-full bg-slate-100 drop-shadow flex justify-around items-center h-20  ">
        <h1 className="bg-teal-200 rounded-lg p-2">{em}</h1>
        <div className="flex">
          <Link
            className="bg-slate-500 m-1 p-1 rounded hover:bg-slate-400 text-white "
            href={`/form`}
          >
            Add data
          </Link>
          <Link
            className="bg-slate-500 m-1 p-1 rounded hover:bg-slate-400 text-white "
            href="/home"
          >
            preview data
          </Link>
          <a
            className="bg-slate-500 m-1 p-1 rounded hover:bg-slate-400 text-white "
            onClick={out}
          >
            log out
          </a>
        </div>
      </header>
      <div>{druphedr}</div>
    </>
  );
}
