"use client";
import React from "react";
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { useSession } from "next-auth/react";

const Uploader = () => {
  const session = useSession();
  const fetchImage = async (data) => {
    console.log(data[0].fileUrl);

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        image: data[0].fileUrl,
        id: session?.data?.user,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
  };
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            // Do something with the response

            fetchImage(res);
            alert("Upload Completed");
          }
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default Uploader;
