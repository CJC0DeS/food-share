import React from "react";

export default function FoodPosting() {
  return (
    <main className=" p-3 max-w-8xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-lime-700">
        Create a Food Posting
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex">
            <p className="my-auto mr-2 w-32">Dish Name:</p>
            <input
              type="text"
              placeholder="Dish Name*"
              className="w-full border p-3 rounded-lg bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Description:</p>
            <textarea
              type="text"
              placeholder="Description (Add description about the contents, include potential allergens)"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="description"
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Your Address:</p>
            <input
              type="text"
              placeholder="Your Address (Pickup address)*"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="address"
              required
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Meal Type:</p>
            <input
              type="text"
              placeholder="Meal Type"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="meal-type"
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Contact Number:</p>
            <input
              type="Number"
              required
              placeholder="Contact Number*"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="primary-contact-no"
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Alt. Contact Number:</p>
            <input
              type="Number"
              required
              placeholder="Alternate Contact Number"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="primary-contact-no"
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Serving(s):</p>
            <input
              placeholder="Serving(s)"
              type="number"
              id="servings"
              min="1"
              max="1000"
              className="w-full p-3 border border-gray-300 rounded-lg bg-lime-100"
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Hours elapsed:</p>
            <input
              placeholder="Hours elapsed after cooking*"
              type="number"
              id="hours-elapsed"
              min="0"
              max="24"
              required
              className="p-3 border border-gray-300 rounded-lg bg-lime-100 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <button className=" mx-auto flex flex-row justify-center align-center p-3 bg-lime-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-64">
          Create Post
        </button>
      </div>
    </main>
  );
}
