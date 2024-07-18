import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiMagnify, mdiArrowDown } from "@mdi/js";
import FoodPostCard from "../components/FoodPostCard";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    servingCount: "",
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [foodPosts, setFoodPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const servingFilterFromUrl = urlParams.get("servingCount");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      servingFilterFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        servingCount: servingFilterFromUrl || "",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchFoodPosts = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/foodpost/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setFoodPosts(data);
      setLoading(false);
    };

    fetchFoodPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === "filter_value") {
      const filter = e.target.value || "";
      setSidebardata({ ...sidebardata, servingCount: filter });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("servingCount", sidebardata.servingCount);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = foodPosts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/foodpost/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setFoodPosts([...foodPosts, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Filter:</label>
            <select
              onChange={handleChange}
              defaultValue={""}
              id="filter_value"
              className="border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
            >
              <option value="">None</option>
              <option value="less than 10">Servings: Less than 10</option>
              <option value="less than 50">Servings: Between 10 and 50</option>
              <option value="50 or above">Servings: More than 50</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              id="sort_order"
              className="border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="createdAt_desc">Servings: High to Low</option>
              <option value="createdAt_asc">Servings: Low to High</option>
            </select>
          </div>
          <button className="text-white  p-3 rounded-3xl uppercase hover:opacity-75 disabled:opacity-50 bg-lime-700 flex justify-center">
            Search
            <Icon path={mdiMagnify} size={1} className="ml-2" />
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && foodPosts.length === 0 && (
            <p className="text-xl text-slate-700">No Posts found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            foodPosts &&
            foodPosts.map((foodPost) => (
              <FoodPostCard key={foodPost._id} foodPost={foodPost} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              <Icon
                path={mdiArrowDown}
                size={1.5}
                className="mx-auto  rounded-full bg-lime-300"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
