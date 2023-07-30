"use client";
import { UserContext } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { status, user } = useContext(UserContext);
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      router?.push("/auth");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <main className="h-screen w-full gap-10 flex flex-col justify-center items-center bg-gray-400">
        <h1 className="text-xl font-bold">
          Logged in as
          <span className="text-3xl font-bold"> {user.username}</span>
        </h1>
      </main>
    );
  }
}
