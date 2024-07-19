import React from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

export default function About() {
  return (
    <div>
      <div className="flex flex-col gap-6 py-16 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-600 font-bold text-5xl lg:text-7xl mx-auto">
          About <span className="text-lime-600"> Us </span>
        </h1>
        <div className="text-gray-500 text-xl lg:text-2xl mx-auto font-semibold max-w-3xl text-center">
          Welcome to FoodShare, where we believe in the power of{" "}
          <span className="text-lime-500"> sharing </span> and{" "}
          <span className="text-lime-500"> community</span>. Our mission is to
          bridge the gap between surplus and scarcity, ensuring that no food
          goes to waste while helping those in need.
        </div>
        <h1 className="text-slate-600 font-bold text-3xl lg:text-5xl mx-auto mt-10">
          <span className="text-lime-600"> Our </span>
          Story
        </h1>
        <div className="text-gray-500 text-xl lg:text-2xl mx-auto font-semibold max-w-3xl text-center">
          In many households, functions, and canteens a significant amount of
          food often goes uneaten and eventually discarded. Simultaneously,
          there are countless individuals and families who struggle to find
          their next meal. Witnessing this disparity inspired us to take action.
          <div className="my-10">
            FoodShare was born out of a simple yet profound idea: <br></br>
            <span className="text-lime-500">
              What if we could connect those with extra food to those who need
              it the most?{" "}
            </span>
          </div>
          With this thought, we set out to create a platform that makes it easy
          for people to donate their leftover food and for NGOs to distribute it
          to the needy.
        </div>
        <h1 className="text-slate-600 font-bold text-3xl lg:text-5xl mx-auto mt-10">
          <span className="text-lime-600"> Our </span>
          Mission
        </h1>
        <div className="text-gray-500 text-xl lg:text-2xl mx-auto font-semibold max-w-3xl text-center">
          <span className="text-2xl lg:text-3xl">We aim to:</span>
          <ul className="flex flex-col mt-5 gap-4">
            <li>
              {" "}
              • <span className="text-lime-500">Reduce</span> food waste by
              providing a convenient way for individuals and businesses to
              donate surplus food.
            </li>
            <li>
              • <span className="text-lime-500">Support</span> NGOs in their
              efforts to feed the hungry by connecting them with reliable
              sources of donations.
            </li>
            <li>
              {" "}
              • <span className="text-lime-500">Promote</span> a culture of
              sharing and community responsibility, encouraging everyone to
              contribute to a more sustainable and empathetic world.
            </li>
          </ul>
        </div>

        <h1 className="text-slate-600 font-bold text-3xl lg:text-5xl mx-auto mt-10">
          Join <span className="text-lime-600"> Us </span>
        </h1>
        <div className="text-gray-500 text-xl lg:text-2xl mx-auto font-semibold max-w-3xl text-center">
          Be a part of the movement to reduce food waste and fight hunger.
          Whether you’re an individual, a restaurant, or an organization, your
          contribution can make a significant difference. <br />
          <span className="block mt-10 text-lime-500">
            Together, we can create a community where surplus food finds its way
            to those who need it most.
          </span>
        </div>

        <Link
          to={"/food-posting"}
          className="text-xs sm:text-sm  mx-auto mt-10"
        >
          <button
            type="button"
            class="flex text-white bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-600"
          >
            <span className="my-auto">DONATE NOW</span>
            <Icon path={mdiArrowRight} size={1} className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}
