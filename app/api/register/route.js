import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt, { genSalt } from "bcryptjs";
import { hashPassword } from "../auth/[...nextauth]/route";

export async function POST(request) {
  const { formData } = await request.json();
  console.log(formData);
  await connect();

  const hashedPassword = await hashPassword(formData.password, 10);

  try {
    console.log("ran");
    await User.create({
      username: formData.username,
      email: formData.email,
      password: hashedPassword,
      authId: "",
      profile: null,
      profileImage: "",
    });

    return NextResponse.json({ message: "user created" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { message: "Error" });
  }
}
