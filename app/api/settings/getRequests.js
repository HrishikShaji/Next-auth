import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const getUser = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("this ran", id);
  await connect();
  try {
    const user = await User.findById(id).populate("profile");
    if (user) {
      return NextResponse.json(user, { message: "success" });
    } else {
      return NextResponse.json({ message: "no user" });
    }
  } catch (err) {
    return NextResponse.json(err, { message: "error" });
  }
};
