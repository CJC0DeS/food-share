import React from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-500 font-bold text-4xl lg:text-6xl mx-auto">
          Transform Your <span className="text-lime-600"> Surplus </span> into{" "}
          <br></br>Someone's <span className="text-lime-500">Hope</span>
        </h1>
        <div className="text-gray-400 text-lg lg:text-xl mx-auto font-semibold">
          Your Leftover Food Can Bring Smiles and Full Bellies to Many
        </div>
        <span className="text-neutral-400 text-sm lg:text-lg mx-auto max-w-lg lg:max-w-3xl mt-10">
          Join our cause to end hunger and food waste.
        </span>
        <span className="text-neutral-400 text-sm lg:text-lg mx-auto max-w-lg lg:max-w-3xl -mt-5">
          Your extra food into a source of hope and happiness for those who need
          it most.
        </span>
        <Link to={"/search"} className="text-xs sm:text-sm  mx-auto mt-10">
          <button
            type="button"
            class="flex text-white bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-600"
          >
            <span className="my-auto">EXPLORE</span>
            <Icon path={mdiArrowRight} size={1} className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}
