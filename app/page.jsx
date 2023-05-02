"use client";
import Image from "next/image";
import { Hind_Siliguri } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
const inter = Hind_Siliguri({
  subsets: ["latin-ext"],
  weight: "400",
});

export default function Home() {
  const userRef = useRef(null);
  const passRef = useRef(null);
  const [error, seterror] = useState("");
  const [btn, setbtn] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (localStorage.uid) {
      router.push("/home");
    }

    return () => {};
  }, []);

  async function onsupmet() {
    if (userRef.current.value === "" || passRef.current.value === "") {
      seterror("empty value");
    } else {
      setbtn("hidden");
      seterror("loding...");
      const data = await fetch("http://localhost:3000/api/Auth", {
        method: "POST",
        body: JSON.stringify({
          username: userRef.current.value,
          password: passRef.current.value,
        }),
      }).then(async (data) => {
        const yser = await data.json();
        if (yser.error) {
          if (yser.error === "auth/user-not-found") {
            seterror("user not found");
          } else if (yser.error === "auth/invalid-email") {
            seterror("invalid email");
          } else if (yser.error === "auth/wrong-password") {
            seterror("wrong password");
          }
          console.log(yser.error);
        } else {
          localStorage.setItem("uid", yser.re.user.uid);
          localStorage.setItem("email", yser.re.user.email);
          console.log(yser);
          router.push("/home");
        }
      });
    }
    console.log(userRef.current.value, passRef.current.value);
    setbtn("");
  }

  return (
    <main
      className={`${inter.className} flex justify-around items-center w-full h-screen `}
    >
      <div className="flex flex-col justify-center items-center bg-slate-100 drop-shadow w-3/4 h-3/6 rounded ">
        <h1 className="text-lg font-bold">Log in</h1>
        <input
          type="text"
          name=""
          id=""
          className="p-3 m-3 border-2 border-black rounded w-3/4"
          placeholder="Username"
          ref={userRef}
        />
        <input
          type="password"
          name=""
          id=""
          className="p-3 m-3 border-2 border-black rounded w-3/4"
          placeholder="password"
          ref={passRef}
        />
        <button
          className={`text-white bg-teal-500 hover:bg-teal-400 p-2 m-2 rounded ${btn}`}
          onClick={onsupmet}
        >
          submit
        </button>
        <h1>{error}</h1>
      </div>
    </main>
  );
}
