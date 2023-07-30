import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Modal from "./Modal";

const UserGeneralInfo = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    organization: "",
    role: "",
    department: "",
    zipCode: "",
  });

  const inputs = [
    {
      name: "firstName",
      value: formData.firstName,
      label: "First Name",
      placeholder: "John",
    },
    {
      name: "lastName",
      value: formData.lastName,
      label: "Last Name",
      placeholder: "Doe",
    },
    {
      name: "country",
      value: formData.country,
      label: "Country",
      placeholder: "India",
    },
    {
      name: "city",
      value: formData.city,
      label: "City",
      placeholder: "e.g. kochi",
    },
    {
      name: "address",
      value: formData.address,
      label: "Address",
      placeholder: "e.g. Fort Kochi",
    },
    {
      name: "email",
      value: formData.email,
      label: "Email",
      placeholder: "example@company.com",
    },
    {
      name: "phoneNumber",
      value: formData.phoneNumber,
      label: "Phone Number",
      placeholder: "e.g +(12)3456789",
    },
    {
      name: "birthday",
      value: formData.birthday,
      label: "Birthday",
      placeholder: "09/11/1999",
    },
    {
      name: "organization",
      value: formData.organization,
      label: "Organization",
      placeholder: "Company Name",
    },
    {
      name: "role",
      value: formData.role,
      label: "Role",
      placeholder: "React Developer",
    },
    {
      name: "department",
      value: formData.department,
      label: "Department",
      placeholder: "Development",
    },
    {
      name: "zipCode",
      value: formData.zipCode,
      label: "Zip/postal code",
      placeholder: "123456",
    },
  ];

  const [updateState, setUpdateState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [data, setData] = useState({});
  const [isModal, setIsModal] = useState(false);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch(`/api/settings/?id=${user._id}&endpoint=getUser`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setData(data));

    const { _id, __v, education, experience, skills, language, ...newData } =
      data?.profile || {};
    setUserData(newData);
  }, [user, updateState, isModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await fetch(
      `/api/settings/?id=${user._id}&endpoint=postUserProfile`,
      {
        method: "POST",
        body: JSON.stringify({ formData: formData }),
        headers: { "Content-Type": "application/json" },
      }
    );

    setEditState(false);
    setIsModal(false);
  };

  const handleChange = async (e) => {
    console.log(e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    setFormData({
      ...formData,
      firstName: data?.profile?.firstName,
      lastName: data?.profile?.lastName,
      country: data?.profile?.country,
      city: data?.profile?.city,
      address: data?.profile?.address,
      email: data?.profile?.email,
      phoneNumber: data?.profile?.phoneNumber,
      birthday: data?.profile?.birthday,
      organization: data?.profile?.organization,
      role: data?.profile?.role,
      department: data?.profile?.department,
      zipCode: data?.profile?.zipCode,
    });
    setIsModal(true);
  };

  const labelMapping = {
    firstName: "First Name",
    lastName: "Last Name",
    country: "Country",
    city: "City",
    address: "Address",
    email: "Email",
    phoneNumber: "Phone Number",
    birthday: "Birthday",
    organization: "Organization",
    role: "Role",
    department: "Department",
    zipCode: "Zip Code",
  };

  console.log(userData);

  return (
    <div className=" p-5 bg-gray-300 flex flex-col  justify-center  gap-10 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">General Information</h1>

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
        <div className="flex flex-col gap-4 items-end">
          <div className="flex flex-col gap-2 w-full">
            {Object.entries(userData || {}).map(([key, value]) => (
              <div className="flex gap-2 items-center" key={key}>
                <h1 className="font-semibold text-lg">{labelMapping[key]} :</h1>
                <h1 className="font-semibold text-lg">{value}</h1>
              </div>
            ))}
          </div>
          <AiFillEdit
            onClick={() => handleModal()}
            className="cursor-pointer"
            size={25}
          />
        </div>
      )}

      <Modal
        setFormData={setFormData}
        isModal={isModal}
        setIsModal={setIsModal}
        formData={formData}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center"
        >
          {inputs.map((input, i) => (
            <div key={i} className="flex flex-col gap-2">
              <label className="pl-2 font-semibold">{input.label}</label>
              <input
                required={true}
                onChange={(e) => handleChange(e)}
                value={input.value}
                name={input.name}
                className="p-2 rounded-md"
                placeholder={input.placeholder}
              />
            </div>
          ))}
          <button className="px-3 py-2 bg-black text-white rounded-md">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserGeneralInfo;
