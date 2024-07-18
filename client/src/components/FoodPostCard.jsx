import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiMapMarker, mdiSilverware, mdiClockOutline } from "@mdi/js";
import calculateElapsedHours from "../utils/timeElapsed";

export default function FoodPostCard({ foodPost }) {
  console.log(foodPost);
  return (
    <div className="bg-lime-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/foodpost-info/${foodPost._id}`}>
        <img
          src={
            foodPost.imageUrl[0] ||
            "https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg"
          }
          alt="foodPost cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {foodPost.name}
          </p>
          <div className="flex items-center gap-1">
            <Icon
              path={mdiMapMarker}
              size={1}
              className=" -ml-1 text-green-700"
            />
            <p className="text-sm text-gray-600 truncate w-full">
              {foodPost.pickupAddress}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 h-10">
            {foodPost.description}
          </p>
          <div className="text-slate-700 flex justify-between">
            <div className="text flex ">
              <Icon
                path={mdiSilverware}
                size={1}
                className="-ml-1 mr-2 text-green-700"
              />{" "}
              <span className="font-bold mr-1">{foodPost.servings}</span> serv
            </div>
            <div className=" text flex">
              <Icon
                path={mdiClockOutline}
                size={1}
                className="mr-2 text-green-700"
              />
              <span className="font-bold mr-1">
                {" "}
                {foodPost.hoursElapsed +
                  calculateElapsedHours(foodPost.createdAt)}{" "}
              </span>
              hr(s)
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
