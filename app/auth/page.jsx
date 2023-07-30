"use client";

import SignInForm from "@/components/SignInForm";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const page = () => {
  const { status } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    console.log(status);
    if (status === "authenticated") {
      router?.push("/");
    }
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <div className="h-screen w-full bg-gray-300 flex flex-col justify-center items-center">
        <SignInForm />
      </div>
    );
  }
};

export default page;
