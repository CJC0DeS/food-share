import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-lime-200 ">
      <div className="flex justify-between items-center p-3">
        <h1 className="font-bold text-4xl lg:text-4xl flex flex-wrapg">
          <Link to="/">
            <button className="hover:opacity-90">
              <span className="text-lime-500">Food</span>
              <span className="text-lime-700">Share</span>
            </button>
          </Link>
        </h1>
        <form className="bg-lime-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-lime-500" />
        </form>
        <ul className="flex gap-8 content-center">
          <li className="hidden lg:inline text-lime-700 hover:text-lime-900">
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li className="hidden md:inline text-lime-700 hover:text-lime-900">
            <Link to="/about">
              {" "}
              <button>About</button>
            </Link>
          </li>
          <li className="text-lime-700 hover:text-lime-900">
            <Link to="/profile">
              {" "}
              <button>
                {currentUser ? (
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={currentUser.avatar}
                    alt="profile photo"
                  />
                ) : (
                  "Sign in"
                )}
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
