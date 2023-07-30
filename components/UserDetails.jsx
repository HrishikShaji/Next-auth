"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserDetails = ({ user }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch(`/api/settings/?id=${user._id}&endpoint=getUser`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [user]);

  return (
    <div className="bg-gray-300 flex flex-col gap-10 rounded-md p-10 w-full h-full">
      <div className="flex gap-4">
        {userData?.profileImage ? (
          <Image
            src={userData.profileImage}
            height={1000}
            width={1000}
            alt="image"
            className="h-40 w-40 rounded-md object-cover"
          />
        ) : (
          <div className="h-40 w-40 rounded-md bg-black">
            {userData?.username && userData.username[0]}
          </div>
        )}
        <div>
          <h1>
            {userData?.profile?.firstName} {userData?.profile?.lastName}
          </h1>
          <h1>{userData?.profile?.role}</h1>
          <h1>
            {userData?.profile?.city},{userData?.profile?.country}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1>Email Address</h1>
          <h1>{userData?.profile?.email}</h1>

          <h1>Home Address</h1>
          <h1>{userData?.profile?.address}</h1>
          <h1>Phone Number</h1>
          <h1>{userData?.profile?.phoneNumber}</h1>
        </div>
        <h1>Languages</h1>
        <div className="flex gap-4">
          {userData?.profile?.language.map((lang, i) => (
            <div key={i} className="bg-black text-white rounded-md px-3 py-2">
              <h1>{lang.language}</h1>
            </div>
          ))}
        </div>
        <h1>Skills</h1>
        <div className="flex gap-4">
          {userData?.profile?.skills.map((skill, i) => (
            <div key={i} className="bg-black text-white rounded-md px-3 py-2">
              <h1>{skill.skill}</h1>
            </div>
          ))}
        </div>
        <h1>Education</h1>
        <div className="flex gap-4">
          {userData?.profile?.education.map((edu, i) => (
            <div key={i} className="bg-black text-white rounded-md px-3 py-2">
              <h1>{edu.course}</h1>
              <h1>{edu.university}</h1>
              <h1>{edu.year}</h1>
            </div>
          ))}
        </div>
        <h1>Experience</h1>
        <div className="flex gap-4">
          {userData?.profile?.experience.map((exp, i) => (
            <div key={i} className="bg-black text-white rounded-md px-3 py-2">
              <h1>{exp.role}</h1>
              <h1>{exp.company}</h1>
              <h1>{exp.year}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
