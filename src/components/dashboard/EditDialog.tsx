"use client";
import {
  setEditDialogClose,
  setPasswordEditFalse,
  setPasswordEditTrue,
  setUsernameEditFalse,
  setUsernameEditTrue,
} from "@/redux/slices/slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "../ui/label";
import { useAppSelector } from "@/redux/store";
import { Input } from "../ui/input";
import { signIn, useSession } from "next-auth/react";
import { Check, Edit } from "lucide-react";
import { useUpdateProfileInfoMutation } from "@/redux/slices/apiSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function EditDialog() {
  const dispatch = useDispatch();
  const { usernameEdit, passwordEdit } = useAppSelector((state) => state.misc);
  const session = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [mutation] = useUpdateProfileInfoMutation();

  function handleUsernameUpdate() {
    dispatch(setUsernameEditFalse());
  }

  function handlePasswordUpdate() {
    dispatch(setPasswordEditFalse());
  }

  async function handleProfileUpdate() {
    dispatch(setEditDialogClose());
    dispatch(setUsernameEditFalse());
    dispatch(setPasswordEditFalse());
    try {
      if (usernameEdit) {
        const res = await mutation({
          usernameEdit: true,
          passwordEdit: false,
          data: { newUsername: username },
        });
        if (res.data.success) {
          toast(res.data.message, { type: "success" });
        } else {
          toast(res.data.message, { type: "error" });
        }
      }
      if (passwordEdit) {
        const res = await mutation({
          usernameEdit: false,
          passwordEdit: true,
          data: { newPassword: password },
        });
        if (res.data.success) {
          toast(res.data.message, { type: "success" });
        } else {
          toast(res.data.message, { type: "error" });
        }
      }
      if (usernameEdit && passwordEdit) {
        const res = await mutation({
          usernameEdit: true,
          passwordEdit: true,
          data: { newUsername: username, newPassword: password },
        });
        if (res.data.success) {
          toast(res.data.message, { type: "success" });
        } else {
          toast(res.data.message, { type: "error" });
        }
      }
    } catch (error) {
      console.log("error while updating profile info: ", error);
      toast("error while updating profile", { type: "error" });
    }
  }

  return (
    <motion.div

      initial={{opacity : 0,scale : 0}}
      whileInView={{opacity : 1,scale : 1}}
      transition={{delay : 0.2}}

     className="absolute top-0 bottom-0 right-0 flex items-center justify-center left-0 backdrop-blur-sm">
      <div className="w-[50vw] h-[60vh] flex  bg-white border-black border-[2px] absolute  rounded-md ">
        <div className="w-[10vw] h-full border-black border-r-[2px]">
          <h1 className="pl-2 pt-2 font-bold text-2xl">Your profile</h1>
        </div>
        <div className="flex-1">
          <div className="mt-5 flex flex-col ml-2 px-2">
            <Label className="text-lg text-gray-600 font-medium">
              Username
            </Label>

            <div className="flex items-center">
              {usernameEdit ? (
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mx-1 mr-3"
                  placeholder={session?.data?.user.username}
                />
              ) : (
                <p className="text-lg text-black font-medium p-1 px-3 mt-2 border-black border-[2px]">
                  {!username ? session?.data?.user.username : username}
                </p>
              )}

              {usernameEdit ? (
                <Check
                  onClick={handleUsernameUpdate}
                  className=" ml-4 cursor-pointer"
                />
              ) : (
                <Edit
                  className="mt-2 ml-2 cursor-pointer"
                  onClick={() => dispatch(setUsernameEditTrue())}
                />
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-col ml-2 px-2">
            <Label className="text-lg text-gray-600 font-medium">email</Label>

            <div className="flex items-center">
              <p className="text-lg text-black font-medium p-1 px-3 mt-2 border-black border-[2px]">
                {session?.data?.user.email}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col ml-2 px-2">
            <Label className="text-lg text-gray-600 font-medium">
              password
            </Label>

            <div className="flex items-center">
              {passwordEdit && (
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mx-1 mr-3"
                  placeholder={"new password"}
                  type="password"
                />
              )}

              {passwordEdit ? (
                <Check
                  onClick={handlePasswordUpdate}
                  className=" ml-4 cursor-pointer"
                />
              ) : (
                <Edit
                  className="mt-2 ml-2 cursor-pointer"
                  onClick={() => dispatch(setPasswordEditTrue())}
                />
              )}
            </div>
          </div>
          <div className="w-full h-16 flex items-center justify-end mt-[80px] ">
            <button
              onClick={() => dispatch(setEditDialogClose())}
              className="border-btn"
            >
              Cancel
            </button>
            <button onClick={handleProfileUpdate} className="button">
              Save
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
