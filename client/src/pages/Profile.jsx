import React from "react";
import { useSelector } from "react-redux";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { mdiLogout } from "@mdi/js";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const handleChange = (event) => {
    console.log("WASSUP");
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-lime-700">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile photo"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4"
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 px-5 rounded-3xl bg-lime-100 focus:outline-lime-500 text-lime-800"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border p-3 px-5 rounded-3xl  bg-lime-100  focus:outline-lime-500 text-lime-800"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 px-5 rounded-3xl  bg-lime-100  focus:outline-lime-500 text-lime-800"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-lime-300 text-lime-800 p-3 rounded-3xl uppercase hover:opacity-75 disabled:opacity-50">
          Update
        </button>
      </form>
      <div className="mt-4 flex flex-row justify-between">
        <button
          type="button"
          className="flex flex-row content-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
        >
          <Icon path={mdiTrashCanOutline} size={1} className="mr-2" />
          Delete Account
        </button>
        <button
          type="button"
          className="flex flex-row content-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
        >
          <Icon path={mdiLogout} size={1} className="mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
