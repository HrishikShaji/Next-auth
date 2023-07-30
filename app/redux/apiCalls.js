import { headers } from "next/dist/client/components/headers";
import { updateError, updateStart, updateSuccess } from "./userSlice";

export const updateUser = async (user, dispatch) => {
  dispatch(updateStart());
  try {
    const response = await fetch("http://localhost:5000/users/123/update", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await response.json();

    console.log(data);

    dispatch(updateSuccess(data));
  } catch (err) {
    dispatch(updateError());
  }
};
