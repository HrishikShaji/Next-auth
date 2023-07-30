"use client";
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({
  isModal,
  setIsModal,
  children,
  setFormData,
  originalFormData,
  formData,
}) => {
  const handleModal = () => {
    setIsModal(false);
    const updatedFormData = {};

    // Set all properties in formData to empty string
    Object.keys(formData).forEach((key) => {
      updatedFormData[key] = "";
    });

    setFormData(updatedFormData);
  };

  if (!isModal) return null;
  return (
    <>
      <div className=" bg-black/80 inset-0 h-max-screen flex justify-center items-center w-screen fixed top-0 z-[100] ">
        <div className="  z-[200] w-[50%] flex flex-col absolute gap-2 items-end">
          <AiOutlineCloseCircle
            onClick={handleModal}
            className="text-white cursor-pointer"
            size={25}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
