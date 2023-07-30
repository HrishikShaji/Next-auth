"use client";
import FormInputs from "@/components/FormInputs";
import Modal from "@/components/Modal";
import UpdateInputs from "@/components/UpdateInputs";
import UserDetails from "@/components/UserDetails";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { user, status } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router?.push("/auth");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="h-full w-full flex flex-col justify-center px-10 pt-[120px] pb-10 items-center">
        <UserDetails user={user} />
      </div>
    );
  }
};

export default page;
