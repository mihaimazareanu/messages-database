import Link from "next/link";
import React from "react";
// import "../styles/home.scss";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="flex justify-between bg-backgroundSecondary text-primary p-4">
        <Link href="/messages">Messages</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
      <h1 className="text-center text-primary m-4 rounded-xl bg-secondary w-2/4 p-4 border-none ml-auto mr-auto">
        Messages database
      </h1>
    </main>
  );
}
