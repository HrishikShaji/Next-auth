"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

const Header = () => {
  const { status, user, username, img, id } = useContext(UserContext);

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="h-[80px] w-full fixed top-0 left-0 z-[300] bg-gray-200 flex justify-between items-center px-5">
      <div>
        <Link href="/" className="font-bold text-3xl">
          AuthStudy
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/profile" className="font-bold text-xl">
          Profile
        </Link>
        <Link href="/settings" className="font-bold text-xl">
          Settings
        </Link>
        <Link href="/dashboard" className="font-bold text-xl">
          Dashboard
        </Link>

        <div className="h-10 w-10 object-cover bg-black rounded-full ">
          {img ? (
            <Image
              src={img}
              alt="profile img"
              height={1000}
              width={1000}
              className="h-10 w-10 object-cover  rounded-full "
            />
          ) : (
            <div className="h-10 w-10 flex justify-center items-center rounded-full text-white bg-black">
              {username && username[0]}
            </div>
          )}
        </div>

        <button
          className="px-3 py-2 rounded-md bg-white"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
