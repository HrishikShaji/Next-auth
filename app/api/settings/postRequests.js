import Profile from "@/models/Profile";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { use } from "react";

export const postUserProfile = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { formData } = await request.json();

  try {
    // Connect to the database
    await connect();

    const profile = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      city: formData.city,
      address: formData.address,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      birthday: formData.birthday,
      organization: formData.organization,
      role: formData.role,
      department: formData.department,
      zipCode: formData.zipCode,
    };
    // Check if the user already has a profile
    const user = await User.findById(id);

    if (!user) {
      console.log("User not found");
      return NextResponse.json("User not found", { status: 404 });
    }

    if (!user.profile) {
      // Create a new profile and associate it with the user
      const createdProfile = await Profile.create({ ...profile });
      user.profile = createdProfile._id;
      await user.save();

      console.log("New profile created and associated with the user");
    } else {
      // Update the existing profile
      await Profile.findByIdAndUpdate(user.profile, { ...profile });

      console.log("User profile updated successfully");
    }

    return NextResponse.json("success");
  } catch (err) {
    console.error(err);
    return NextResponse.json(err, { message: "Error" });
  }
};
