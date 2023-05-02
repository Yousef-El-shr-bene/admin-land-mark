"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function AddForm() {
  const ApartmentDataref = useRef(null);
  const Feedbackref = useRef(null);
  const customerNameref = useRef(null);
  const phoneNumberref = useRef(null);
  const [sell, setsell] = useState(null);
  const [error, seterror] = useState("");
  const [loding, setloding] = useState("");
  const router = useRouter();

  async function handelsubmit() {
    setloding("hidden");
    seterror("Loding...");
    if (
      ApartmentDataref.current.value === "" ||
      Feedbackref.current.value === "" ||
      customerNameref.current.value === "" ||
      phoneNumberref.current.value === "" ||
      sell === null
    ) {
      seterror("input Empty");
      console.log(phoneNumberref.current.value);
    } else if (phoneNumberref.current.value.length > 11 || phoneNumberref.current.value.length < 11){
      seterror("Phone number must be 11 digits")
    }else {
      const data = await fetch("http://localhost:3000/api/addform", {
        method: "POST",
        body: JSON.stringify({
          ApartmentData: ApartmentDataref.current.value,
          Feedback: Feedbackref.current.value,
          customerName: customerNameref.current.value,
          email: window.localStorage.email,
          phoneNumber: phoneNumberref.current.value,
          sell: sell,
          uid: window.localStorage.uid,
        }),
      }).then(async (data) => {
        router.push("/home");
      });
    }
    setloding("");
  }
  function inputtru() {
    setsell("true");
  }
  function inputfls(params) {
    setsell("false");
  }
  return (
    <div className="w-4/5 h-auto flex flex-col justify-center rounded bg-slate-300 p-6 m-6">
      <input
        type="text"
        name=""
        id=""
        placeholder="اسم العميل"
        className="border-2 border-black rounded m-1 p-1 "
        ref={customerNameref}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="رقم الهاتف"
        className="border-2 border-black rounded m-1 p-1 "
        ref={phoneNumberref}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="بينات الشقة"
        className="border-2 border-black rounded m-1 p-1 "
        ref={ApartmentDataref}
      />
      <div className="flex justify-around">
        <div>
          <input
            type="radio"
            id="age1"
            name="age"
            value="30"
            onClick={inputfls}
          />
          <label>ايجار</label>
        </div>
        <div>
          <input
            type="radio"
            id="age1"
            name="age"
            value="30"
            onClick={inputtru}
          />
          <label>بيع</label>
        </div>
      </div>
      <textarea
        type="text"
        name=""
        id=""
        placeholder="فيد باك"
        className="border-2 border-black rounded m-1 p-1 h-20 "
        ref={Feedbackref}
      />
      <button
        className={`text-white bg-teal-500 hover:bg-teal-400 p-2 m-2 rounded ${loding} `}
        onClick={handelsubmit}
      >
        submit
      </button>
      <h1 className="text-senter">{error}</h1>
    </div>
  );
}
