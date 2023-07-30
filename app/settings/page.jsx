"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Uploader from "@/components/Uploader";
import UserInfo from "@/components/UserInfo";
import UserPasswordInfo from "@/components/UserPasswordInfo";
import UserGeneralInfo from "@/components/UserGeneralInfo";
import UserDetails from "@/components/UserDetails";

import UserForm from "@/components/UserForm";
import Modal from "@/components/Modal";
import Username from "@/components/Username";

const page = () => {
  const { status, user } = useContext(UserContext);
  const router = useRouter();
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router?.push("/auth");
    }
  }, [status]);

  const experienceFields = {
    role: "",
    company: "",
    year: "",
  };

  const educationFields = {
    course: "",
    university: "",
    year: "",
  };

  const languageFields = {
    language: "",
    proficiency: "",
  };

  const skillFields = {
    skill: "",
    skillLevel: "",
  };

  const passwordFields = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const usernameFields = {
    newUsername: "",
  };

  const [experienceData, setExperienceData] = useState(experienceFields);
  const [educationData, setEducationData] = useState(educationFields);
  const [languageData, setLanguageData] = useState(languageFields);
  const [skillData, setSkillData] = useState(skillFields);
  const [passwordData, setPasswordData] = useState(passwordFields);
  const [usernameData, setUsernameData] = useState(usernameFields);
  const [isModal, setIsmodal] = useState(false);

  const usernameInputs = [
    {
      label: "New Username",
      name: "newUsername",
      required: true,
      value: usernameData.newUsername,
      placeholder: "New Username",
    },
  ];

  const passwordInputs = [
    {
      label: "Current Password",
      name: "currentPassword",
      value: passwordData.currentPassword,
      required: true,
      placeholder: "Current Password",
    },
    {
      label: "New Password",
      name: "newPassword",
      value: passwordData.newPassword,
      required: true,
      placeholder: "New Password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      value: passwordData.confirmPassword,
      required: true,
      placeholder: "Confirm Password",
      pattern: passwordData.newPassword,
      patternError: "Passwords do not match",
    },
  ];

  const experienceInputs = [
    {
      label: "Role",
      name: "role",
      value: experienceData.role,
    },
    {
      label: "Company",
      name: "company",
      value: experienceData.company,
    },
    {
      label: "Year",
      name: "year",
      value: experienceData.year,
    },
  ];

  const educationInputs = [
    {
      label: "Course",
      name: "course",
      value: educationData.course,
    },
    {
      label: "University",
      name: "university",
      value: educationData.university,
    },
    {
      label: "Year",
      name: "year",
      value: educationData.year,
    },
  ];

  const languageInputs = [
    {
      label: "Language",
      name: "language",
      value: languageData.language,
    },
    {
      label: "Proficiency",
      name: "proficiency",
      value: languageData.proficiency,
    },
  ];

  const skillInputs = [
    {
      label: "Skill",
      name: "skill",
      value: skillData.skill,
    },
    {
      label: "Skill Level",
      name: "skillLevel",
      value: skillData.skillLevel,
    },
  ];

  if (status === "authenticated") {
    return (
      <div className="h-full w-full flex justify-center gap-10  pt-40 pb-10 bg-gray-400">
        <div className="flex w-[90%] md:w-[60%] flex-col gap-2">
          <div className="flex bg-gray-300 rounded-md justify-between p-10">
            <UserInfo user={user} />

            <div className="flex flex-col gap-2">
              <Username
                user={user}
                formData={usernameData}
                setFormData={setUsernameData}
                inputs={usernameInputs}
              />
              <UserPasswordInfo
                user={user}
                formData={passwordData}
                setFormData={setPasswordData}
                inputs={passwordInputs}
              />
            </div>
          </div>
          <UserGeneralInfo user={user} />
          <UserForm
            formData={experienceData}
            setFormData={setExperienceData}
            inputs={experienceInputs}
            profileField="experience"
            GETurl={`/api/settings/?id=${user._id}&endpoint=getUser`}
            AddUrl="/api/settings/?endpoint=patchAddExperience"
            RemoveUrl="/api/settings/?endpoint=patchRemoveExperience"
            EditUrl="/api/settings/?endpoint=patchEditExperience"
          />
          <UserForm
            formData={educationData}
            setFormData={setEducationData}
            inputs={educationInputs}
            profileField="education"
            GETurl={`/api/settings/?id=${user._id}&endpoint=getUser`}
            AddUrl="/api/settings/?endpoint=patchAddEducation"
            RemoveUrl="/api/settings/?endpoint=patchRemoveEducation"
            EditUrl="/api/settings/?endpoint=patchEditEducation"
          />
          <UserForm
            formData={languageData}
            setFormData={setLanguageData}
            inputs={languageInputs}
            profileField="language"
            GETurl={`/api/settings/?id=${user._id}&endpoint=getUser`}
            AddUrl="/api/settings/?endpoint=patchAddLanguage"
            RemoveUrl="/api/settings/?endpoint=patchRemoveLanguage"
            EditUrl="/api/settings/?endpoint=patchEditLanguage"
          />
          <UserForm
            formData={skillData}
            setFormData={setSkillData}
            inputs={skillInputs}
            profileField="skill"
            GETurl={`/api/settings/?id=${user._id}&endpoint=getUser`}
            AddUrl="/api/settings/?endpoint=patchAddSkill"
            RemoveUrl="/api/settings/?endpoint=patchRemoveSkill"
            EditUrl="/api/settings/?endpoint=patchEditSkill"
          />
        </div>
      </div>
    );
  }
};
export default page;
