"use client";
import cookie from 'js-cookie'
import React, { useState } from "react";

export default function Crd({
  email,
  customerName,
  phoneNumber,
  sell,
  feedback,
  time,
  id,
}) {
  const [loding, setloding] = useState("");
  const [hidden, sethidden] = useState("");
  const coo = cookie.get("email")
  let unix_timestamp = time.seconds;
  let date = new Date(unix_timestamp * 1000);
  async function delet() {
    setloding("loding...");
    sethidden("hidden");
    await fetch("/api/DeleteFrom", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    setloding("Deleted successfully");
  }
  const el = (
    <>
      <button
        className={`bg-slate-500 m-1 p-1 rounded hover:bg-slate-400 text-white ${hidden} `}
        onClick={delet}
      >
        delet
      </button>
      <h1>{loding}</h1>
    </>
  );
  return (
    <>
      <div
        className="flex flex-col justify-start border-black border-1 border-solid rounded m-3 p-3 bg-teal-50"
        id={id}
      >
        <h1>user : {email}</h1>
        <h2>customerName : {customerName}</h2>
        <h3>phoneNumber : {phoneNumber}</h3>
        <h3>{sell}</h3>
        <h3>feedback : {feedback}</h3>
        <h3>
          time : {date.toLocaleTimeString("default")} -{" "}
          {date.toLocaleDateString("default")}
        </h3>
        {coo === "mena@lm.com" || loding === "" ? el : ""}
      </div>
    </>
  );
}
