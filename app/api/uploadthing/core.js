import { createUploadthing } from "uploadthing/next";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import User from "@/models/User";

const f = createUploadthing();

const auth = async (req) => {
  const session = await getServerSession();
  console.log(session);
  if (session && session.user) {
    // User is logged in, you can access their details here
    const { id, name, email } = session.user;
    console.log("Logged-in user:", { id, name, email });

    // You can return the user object or extract specific details as needed
    return { id, name, email };
  } else {
    // User is not logged in, handle the unauthorized case if needed
    throw new Error("Unauthorized");
  }
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "10MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),

  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
};
