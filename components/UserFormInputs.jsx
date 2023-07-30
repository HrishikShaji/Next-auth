"use client";
import React from "react";

const UserFormInputs = (props) => {
  const { handleChange, label, patternError, ...inputProps } = props;
  console.log({ ...inputProps });
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="pl-2 font-semibold">{label}</label>
        <input
          {...inputProps}
          onChange={handleChange}
          className="p-2 rounded-md peer"
        />
      </div>
      <span className="peer-invalid:block hidden">{patternError}</span>
    </>
  );
};

export default UserFormInputs;
