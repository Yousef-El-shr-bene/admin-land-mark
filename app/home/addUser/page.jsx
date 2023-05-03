"use client";
import React, { useRef, useState } from "react";
export default function Adduser() {
  const userref = useRef(null);
  const passref = useRef(null);
  const [error, seterror] = useState("");
  const [loding, setloding] = useState("");

  async function handelsubmit() {
    setloding("hidden");
    seterror("Loding...");
    if (userref.current.value === "" || passref.current.value === "") {
      seterror("input Empty");
    } else {
      const data = await fetch("/api/addUser", {
        method: "POST",
        body: JSON.stringify({
          username: userref.current.value,
          password: passref.current.value,
        }),
      }).then(async (data) => {
        const yser = await data.json();
        if (yser.error) {
          if (yser.error === "auth/email-already-in-use") {
            seterror("email already in use");
          } else if (yser.error === "auth/invalid-email") {
            seterror("invalid email");
          } else if (yser.error === "auth/weak-password") {
            seterror("weak password");
          } else {
            seterror(yser.error);
          }
        } else {
          seterror("New account created successfully");
        }
      });
    }
    setloding("");
  }
  return (
    <div className="w-full flex flex-col justify-center items-center text-center ">
      <div className="w-4/5 h-auto flex flex-col justify-center rounded bg-slate-300 p-6 m-6">
        <input
          type="text"
          name=""
          id=""
          placeholder="اسم المستخدم"
          className="border-2 border-black rounded m-1 p-1 "
          ref={userref}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="كلمة المرور"
          className="border-2 border-black rounded m-1 p-1 "
          ref={passref}
        />
        <button
          className={`text-white bg-teal-500 hover:bg-teal-400 p-2 m-2 rounded ${loding} `}
          onClick={handelsubmit}
        >
          submit
        </button>
        <h1>{error}</h1>
      </div>
      <h1> mena@ml.com ملحوظة يجب ان يكون اسم المستخدم عبارة عن ايميل مثل </h1>
      <h1>كلمة السر يجب ان تكون تساوي او اكثر من 8 ارقام او حروف</h1>
    </div>
  );
}
