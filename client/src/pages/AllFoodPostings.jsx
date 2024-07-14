import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDateToReadable } from "../utils/display";

export default function AllFoodPostings() {
  const [showPostingsError, setShowPostingsError] = useState(false);
  const [userPostings, setUserPostings] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPostings = async () => {
      try {
        setShowPostingsError(false);
        const res = await fetch(`/api/user/foodposts/user/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowPostingsError(true);
          return;
        }
        setUserPostings(data);
      } catch (error) {
        setShowPostingsError(true);
      }
    };

    fetchPostings();
  }, []);

  const handlePostDelete = async (postingId) => {
    try {
      const res = await fetch(`/api/foodpost/delete/${postingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }

      setUserPostings((prev) =>
        prev.filter((posting) => posting._id !== postingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(userPostings);
  return (
    <main className=" p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-lime-700">
        Your Postings
      </h1>

      {userPostings !== null && userPostings.length > 0 && (
        <div>
          <div className="flex flex-col gap-4 mb-4">
            <div className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <p className="w-28">POSTING DATE</p>
              <p className="w-16">IMAGE</p>
              <p className="flex-1">DISH NAME</p>
              <p>SERVING(S)</p>
              <p>ACTIONS</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {userPostings.map((posting) => (
              <div
                key={posting._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <p>{formatDateToReadable(posting.createdAt)}</p>
                <Link to={`/foodpost/${posting._id}`}>
                  <img
                    src={
                      posting.imageUrl.length
                        ? posting.imageUrl[0]
                        : "https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg"
                    }
                    alt="posting cover image"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/foodpost/${posting._id}`}
                >
                  <p>{posting.name}</p>
                </Link>
                <div className="flex w-24 justify-center">
                  <p>{posting.servings}</p>
                </div>

                <div className="flex flex-col item-center">
                  <button
                    className="text-red-700 uppercase"
                    onClick={() => handlePostDelete(posting._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/foodpost/${posting._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
