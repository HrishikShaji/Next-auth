"use client";

import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(null);
  const session = useSession();
  const [user, setUser] = useState({});
  const [img, setImg] = useState("");

  useEffect(() => {
    if (session) {
      setStatus(session.status);
      if (session.data?.user) {
        fetch(`/api/user/?id=${session.data?.user}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
            setImg(data.profileImage);
          })
          .catch((error) => {
            console.log("Error fetching user data:", error);
          });
      }
    }
  }, [session, session?.data?.user]);

  return (
    <UserContext.Provider
      value={{
        setModal,
        modal,
        status,
        user,
        img,
        username: user.username,
        userId: user._id,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
