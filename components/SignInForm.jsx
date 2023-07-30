"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import FormInputs from "./FormInputs";

const SignInForm = () => {
  const router = useRouter();
  const [action, setAction] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const loginInputs = [
    {
      id: 0,
      name: "username",
      type: "text",
      placeholder: "username",
      value: loginData.username,
      errorMessage: "User do not exist",
    },
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "password",
      value: loginData.password,
      errorMessage: "password Wrong",
    },
  ];

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "username",
      required: true,
      pattern: "^[A-Za-z0-9]{3,10}$",
      value: formData.username,
      errorMessage:
        "username should be only 3-10 characters and should not include any special characters",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "email",
      required: true,
      value: formData.email,

      errorMessage: "Enter a valid email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "password",
      required: true,
      pattern: "^[A-Za-z0-9]{3,10}$",
      value: formData.password,
      errorMessage:
        "password should be atleast 8 characters and should contain atleast 1 special character,uppercase letter and number",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "confirm password",
      required: true,
      pattern: formData.password,
      errorMessage: "Passwords do not match",
    },
  ];

  const handleChange = (e) => {
    if (action) {
      setFormData((formData) => ({
        ...formData,
        [e.target.name]: e.target.value,
      }));
    } else {
      setLoginData((loginData) => ({
        ...loginData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (action) {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.message === "user created") {
        await signIn("credentials", {
          redirect: false,
          username: formData.username,
          password: formData.password,
        });
      }

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } else {
      const response = await signIn("credentials", {
        redirect: false,
        username: loginData.username,
        password: loginData.password,
      });

      setError(response.error);
      if (response.error === null) {
        router?.push("/");
      }
    }
  };

  const signUp = async (provider) => {
    const res = await signIn(provider);
    console.log(res);
  };

  return (
    <div className="flex justify-center items-center flex-col  gap-4 p-10 bg-gray-400 rounded-md">
      <form onSubmit={handleSubmit} className="flex w-[300px] flex-col gap-4">
        {action
          ? inputs.map((input, i) => (
              <FormInputs
                key={i}
                {...input}
                error={error}
                handleChange={handleChange}
              />
            ))
          : loginInputs.map((input, i) => (
              <FormInputs
                key={i}
                {...input}
                error={error}
                handleChange={handleChange}
              />
            ))}
        <button className="px-3 py-2 rounded-md bg-white">Submit</button>
      </form>
      <div className="flex flex-col justify-center gap-4 items-center">
        <div className="flex gap-2 items-center">
          <span>Already have an account?</span>
          <button
            className="px-3 py-2 rounded-md bg-black text-white"
            onClick={() => setAction(!action)}
          >
            {action ? "Log In" : "Sign Up"}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 bg-black text-white rounded-md"
            onClick={() => signUp("google")}
          >
            google
          </button>
          <button
            className="px-3 py-2 bg-black text-white rounded-md"
            onClick={() => signUp("github")}
          >
            github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
