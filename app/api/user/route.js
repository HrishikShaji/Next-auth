import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await connect();

  const user = await User.findById(id);

  try {
    if (user) {
      return NextResponse.json(user, { message: "user exist" });
    }
  } catch (err) {
    return NextResponse.json(err, { message: "An Error" });
  }
};

export const POST = async (request) => {
  const { image, id } = await request.json();

  console.log(image, id);

  await connect();

  try {
    await User.findByIdAndUpdate(id, {
      profileImage: image,
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: "failure" });
  }
};
