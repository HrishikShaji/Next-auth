"use client";
import { UserContext } from "@/context/UserContext";
import UserFormInputs from "./UserFormInputs";
import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { IoAddCircle } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const UserForm = ({
  GETurl,
  AddUrl,
  RemoveUrl,
  inputs,
  setFormData,
  profileField,
  formData,
  EditUrl,
}) => {
  const [data, setData] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  const originalFormData = formData;

  const { user } = useContext(UserContext);
  useEffect(() => {
    fetch(GETurl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (data) =>
          (profileField === "experience" &&
            setData(data?.profile?.experience)) ||
          (profileField === "education" && setData(data?.profile?.education)) ||
          (profileField === "language" && setData(data?.profile?.language)) ||
          (profileField === "skill" && setData(data?.profile?.skills))
      );
  }, [user]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(formData);

    const newData = [formData];
    const res = await fetch(AddUrl, {
      method: "PATCH",
      body: JSON.stringify({ id: user._id, formData: newData }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  const handleRemove = async (item) => {
    console.log(item);
    const res = await fetch(RemoveUrl, {
      method: "PATCH",
      body: JSON.stringify({ id: user._id, item: item }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
  };

  const handleModal = async (item, i) => {
    console.log(data);
    setUpdateItem(item);
    setIsUpdateModalOpen(true);
    setFormData(data[i]);
    console.log(i);
  };

  const handleEdit = async (e, item) => {
    e.preventDefault();
    console.log(formData, item);
    const res = await fetch(EditUrl, {
      method: "PATCH",
      body: JSON.stringify({ id: user._id, formData: formData, item: item }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className=" p-5 bg-gray-300 flex flex-col  items-end  gap-10 rounded-md">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold">{profileField}</h1>
        {updateState ? (
          <BiSolidUpArrow
            size={25}
            onClick={() => setUpdateState(!updateState)}
            className=" cursor-pointer"
          />
        ) : (
          <BiSolidDownArrow
            size={25}
            onClick={() => setUpdateState(!updateState)}
            className=" cursor-pointer"
          />
        )}
      </div>

      {updateState && (
        <>
          <div className="w-full">
            {data && data?.length === 0 ? (
              <h1>You have no Experience</h1>
            ) : (
              data?.map((items, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center justify-between"
                >
                  <div className="flex flex-col gap-2 font-semibold">
                    {Object.values(items).map((item, i) => (
                      <h1 key={i}>{item}</h1>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <AiFillEdit
                      size={25}
                      onClick={() => handleModal(Object.values(items)[0], i)}
                      className="cursor-pointer"
                    />
                    <MdDelete
                      size={25}
                      onClick={() => handleRemove(Object.values(items)[0])}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <IoIosAddCircle
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
            size={25}
          />

          <Modal
            originalFormData={originalFormData}
            setFormData={setFormData}
            isModal={isModalOpen}
            setIsModal={setIsModalOpen}
            formData={formData}
          >
            <form
              onSubmit={handleSave}
              className="flex flex-col gap-2 items-start w-full bg-gray-300 p-10 rounded-md"
            >
              {inputs.map((input, i) => (
                <UserFormInputs
                  key={i}
                  {...input}
                  handleChange={handleChange}
                />
              ))}

              <button className="px-3 py-2 rounded-md bg-black text-white">
                Save
              </button>
            </form>
          </Modal>

          <Modal
            setFormData={setFormData}
            isModal={isUpdateModalOpen}
            setIsModal={setIsUpdateModalOpen}
            originalFormData={originalFormData}
            formData={formData}
          >
            <form
              onSubmit={(e) => handleEdit(e, updateItem)}
              className="flex flex-col gap-2 items-start w-full bg-gray-300 p-10 rounded-md"
            >
              <h1>{updateItem}</h1>
              {inputs.map((input, i) => (
                <UserFormInputs
                  key={i}
                  {...input}
                  handleChange={handleChange}
                />
              ))}

              <button className="px-3 py-2 rounded-md bg-black text-white">
                update
              </button>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default UserForm;
