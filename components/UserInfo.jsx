import React from "react";
import Uploader from "./Uploader";
import Image from "next/image";
import UserPasswordInfo from "./UserPasswordInfo";

const UserInfo = ({ user }) => {
  return (
    <div className="flex items-end gap-4">
      {user?.profileImage ? (
        <Image
          src={user?.profileImage}
          alt="image"
          height={1000}
          width={1000}
          className="h-36 w-36 object-cover rounded-md"
        />
      ) : (
        <div className="h-36 w-36 flex justify-center items-center bg-black text-white rounded-md">
          {user?.username && user.username[0]}
        </div>
      )}
      <div className="flex flex-col items-start">
        <Uploader />
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-bold ">{user?.username}</h1>
        </div>
        <h1 className="text-xl font-bold">{user?.email}</h1>
      </div>
    </div>
  );
};

export default UserInfo;
