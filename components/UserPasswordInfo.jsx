import { Modak } from "next/font/google";
import React, { useState } from "react";
import Modal from "./Modal";
import UserFormInputs from "./UserFormInputs";

const UserPasswordInfo = ({ user, formData, setFormData, inputs }) => {
  const [isModal, setIsModal] = useState(false);

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await fetch(`/api/settings/?endpoint=patchUpdatePassword`, {
      method: "PATCH",
      body: JSON.stringify({
        id: user._id,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="">
      <button
        className="px-3 py-2 w-full rounded-md bg-black text-white"
        onClick={() => setIsModal(true)}
      >
        Change Password
      </button>

      <Modal
        isModal={isModal}
        setIsModal={setIsModal}
        formData={formData}
        setFormData={setFormData}
      >
        <form
          onSubmit={handleSubmit}
          className="  p-10 bg-gray-300 w-full flex flex-col items-start  gap-4 rounded-md"
        >
          {inputs?.map((input, i) => (
            <UserFormInputs key={i} {...input} handleChange={handleChange} />
          ))}

          <button className="px-3 py-2 bg-black text-white rounded-md">
            Change Password
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserPasswordInfo;
