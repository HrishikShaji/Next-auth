import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { hashPassword } from "../auth/[...nextauth]/route";

import {
  patchAddEducation,
  patchAddExperience,
  patchAddLanguage,
  patchAddSkill,
  patchEditEducation,
  patchEditExperience,
  patchEditLanguage,
  patchEditSkill,
  patchRemoveEducation,
  patchRemoveExperience,
  patchRemoveLanguage,
  patchRemoveSkill,
  patchUpdatePassword,
  patchUpdateUsername,
} from "./patchRequests";
import { getUser } from "./getRequests";
import { postUserProfile } from "./postRequests";

const handler = async (request) => {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const { method } = request;

  console.log("this ran :", endpoint);
  console.log(method, request.url);

  switch (method) {
    case "PATCH":
      if (endpoint === "patchUpdateUsername") {
        return patchUpdateUsername(request);
      } else if (endpoint === "patchUpdatePassword") {
        return patchUpdatePassword(request);
      } else if (endpoint === "patchRemoveSkill") {
        return patchRemoveSkill(request);
      } else if (endpoint === "patchAddSkill") {
        return patchAddSkill(request);
      } else if (endpoint === "patchAddEducation") {
        return patchAddEducation(request);
      } else if (endpoint === "patchRemoveEducation") {
        return patchRemoveEducation(request);
      } else if (endpoint === "patchAddExperience") {
        return patchAddExperience(request);
      } else if (endpoint === "patchRemoveExperience") {
        return patchRemoveExperience(request);
      } else if (endpoint === "patchAddLanguage") {
        return patchAddLanguage(request);
      } else if (endpoint === "patchRemoveLanguage") {
        return patchRemoveLanguage(request);
      } else if (endpoint === "patchEditLanguage") {
        return patchEditLanguage(request);
      } else if (endpoint === "patchEditExperience") {
        return patchEditExperience(request);
      } else if (endpoint === "patchEditEducation") {
        return patchEditEducation(request);
      } else if (endpoint === "patchEditSkill") {
        return patchEditSkill(request);
      }
      break;
    case "GET":
      if (endpoint === "getUser") {
        return getUser(request);
      }
      break;
    case "POST":
      if (endpoint === "postUserProfile") {
        return postUserProfile(request);
      }
      break;
    default:
      return new NextResponse("Method not allowed");
  }
};

export { handler as PATCH, handler as GET, handler as POST };
