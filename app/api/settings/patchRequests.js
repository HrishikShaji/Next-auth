import connect from "@/utils/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { hashPassword } from "../auth/[...nextauth]/route";

export const patchUpdateUsername = async (request) => {
  const { id, newUsername } = await request.json();
  console.log("one ran");
  await connect();

  try {
    await User.findByIdAndUpdate(id, { username: newUsername });

    return NextResponse.json({ message: "Success" });
  } catch (err) {
    return NextResponse.json(err, { message: "Error" });
  }
};

export const patchUpdatePassword = async (request) => {
  const { id, currentPassword, newPassword } = await request.json();
  console.log(id, currentPassword, newPassword);

  await connect();

  const user = await User.findById(id);

  try {
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      console.log(isPasswordCorrect);
      if (isPasswordCorrect) {
        const hashedPassword = await hashPassword(newPassword, 10);

        await User.findByIdAndUpdate(id, { password: hashedPassword });

        return NextResponse.json({ message: "Success" });
      }
      return NextResponse.json({ message: "password wrong" });
    }

    return NextResponse.json({ message: "no user" });
  } catch (err) {
    console.log(err, "did not happen");
    return NextResponse.json({ message: "Error" });
  }
};

//SKILLS
export const patchAddEducation = async (request) => {
  const { id, formData } = await request.json();

  return addProfileField(id, formData, "education");
};

export const patchAddExperience = async (request) => {
  const { id, formData } = await request.json();

  return addProfileField(id, formData, "experience");
};

export const patchAddSkill = async (request) => {
  const { id, formData } = await request.json();

  return addProfileField(id, formData, "skill");
};

//LANGUAGE

export const patchAddLanguage = async (request) => {
  const { id, formData } = await request.json();

  return addProfileField(id, formData, "language");
};

const addProfileField = async (id, formData, field) => {
  await connect();

  const profileField =
    field === "experience"
      ? "experience"
      : field === "language"
      ? "language"
      : field === "education"
      ? "education"
      : field === "skill"
      ? "skills"
      : "wrong operation";

  try {
    const user = await User.findById(id).populate("profile");
    if (user) {
      const updatedArray = [...user.profile[profileField], ...formData];
      await Profile.findByIdAndUpdate(user.profile, {
        [profileField]: updatedArray,
      });

      return NextResponse.json({ message: "Success" });
    } else {
      return NextResponse.json({ message: "No user" });
    }
  } catch (err) {
    return NextResponse.json(err, { message: "Error" });
  }
};

//REMOVE Functions

const removeProfileField = async (id, item, field) => {
  const profileField =
    field === "experience"
      ? "experience"
      : field === "language"
      ? "language"
      : field === "education"
      ? "education"
      : field === "skill"
      ? "skills"
      : "wrong operation";

  const updateField =
    field === "experience"
      ? "role"
      : field === "language"
      ? "language"
      : field === "education"
      ? "course"
      : field === "skill"
      ? "skill"
      : "wrong operation";

  try {
    await connect();

    const user = await User.findById(id).populate("profile");
    if (user) {
      console.log(user.profile.language);

      const updatedArray = user.profile[profileField].filter(
        (items) => items[updateField] !== item
      );

      await Profile.findByIdAndUpdate(user.profile, {
        [profileField]: updatedArray,
      });

      return NextResponse.json({ message: "Success" });
    } else {
      return NextResponse.json({ message: "no user" });
    }
  } catch (err) {
    return NextResponse.json(err, { message: "Error" });
  }
};

export const patchRemoveLanguage = async (request) => {
  const { id, item } = await request.json();
  return removeProfileField(id, item, "language");
};

export const patchRemoveExperience = async (request) => {
  const { id, item } = await request.json();
  return removeProfileField(id, item, "experience");
};

export const patchRemoveEducation = async (request) => {
  const { id, item } = await request.json();
  return removeProfileField(id, item, "education");
};

export const patchRemoveSkill = async (request) => {
  const { id, item } = await request.json();
  return removeProfileField(id, item, "skill");
};

//EDIT Functions

export const editProfileField = async (id, formData, item, field) => {
  await connect();
  const user = await User.findById(id).populate("profile");
  if (!user) throw new Error("user do not exist");

  const profileField =
    field === "experience"
      ? "experience"
      : field === "language"
      ? "language"
      : field === "education"
      ? "education"
      : field === "skill"
      ? "skills"
      : "wrong operation";

  const updateField =
    field === "experience"
      ? "role"
      : field === "language"
      ? "language"
      : field === "education"
      ? "course"
      : field === "skill"
      ? "skill"
      : "wrong operation";

  const updatedArray = user.profile[profileField].map((itemData) =>
    itemData[updateField] !== item ? itemData : formData
  );
  console.log(profileField, updateField);
  try {
    await Profile.findByIdAndUpdate(user.profile._id, {
      [profileField]: updatedArray,
    });
    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json(err, { message: "error" });
  }
};

export const patchEditLanguage = async (request) => {
  const { id, formData, item } = await request.json();
  return editProfileField(id, formData, item, "language");
};

export const patchEditExperience = async (request) => {
  const { id, formData, item } = await request.json();
  return editProfileField(id, formData, item, "experience");
};

export const patchEditEducation = async (request) => {
  const { id, formData, item } = await request.json();
  return editProfileField(id, formData, item, "education");
};

export const patchEditSkill = async (request) => {
  const { id, formData, item } = await request.json();
  return editProfileField(id, formData, item, "skill");
};
