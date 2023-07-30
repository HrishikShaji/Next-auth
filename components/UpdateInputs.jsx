"use client";
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";

const UpdateInputs = (props) => {
  const [updateButton, setUpdateButton] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const { user, label, updateLabel, name } = props;

  const handleSubmit = async (inputName) => {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify({
        value: updateValue,
        id: user._id,
        input: inputName,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    setUpdateButton(false);
  };

  return (
    <div className="flex gap-4 items-center w-full justify-between">
      <div className="flex gap-4 items-center">
        <label
          className={`${
            label === "Password" ? "hidden" : "block"
          } font-bold text-xl `}
        >
          {updateButton ? updateLabel : label}
        </label>
        {updateButton ? (
          <input
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
          />
        ) : (
          <h1
            className={`${
              label === "Password" ? "hidden" : "block"
            } text-lg font-semibold`}
          >
            {name}
          </h1>
        )}
      </div>
      {updateButton ? (
        <button
          onClick={() => handleSubmit(name)} // Use handleSubmit function
          className="px-3 py-2 rounded-md bg-black text-white"
        >
          Update {label}
        </button>
      ) : (
        <button
          onClick={() => setUpdateButton(true)}
          className="px-3 py-2 rounded-md bg-black text-white"
        >
          Change {label}
        </button>
      )}
    </div>
  );
};

export default UpdateInputs;
