import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../common/ImageCarousel";
import Icon from "@mdi/react";
import {
  mdiMapMarker,
  mdiPhone,
  mdiSilverware,
  mdiClockOutline,
  mdiEmailArrowRightOutline,
} from "@mdi/js";
import calculateElapsedHours from "../utils/timeElapsed";
import MailToPublisher from "../components/MailToPublisher";
import { useSelector } from "react-redux";

export default function FoodPostInfo() {
  const [foodPost, setFoodPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchFoodPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/foodpost/get/${params.postId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setFoodPost(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchFoodPost();
  }, [params.postId]);

  const handleTextAreaClose = (value) => {
    setContact(value);
  };
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {foodPost && !loading && !error && (
        <div>
          <ImageCarousel images={foodPost.imageUrl} />
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="flex ">
              <span className="flex flex-1 text-2xl font-semibold">
                {foodPost.name}
              </span>
              <span className="flex my-auto">
                <Icon
                  path={mdiSilverware}
                  size={1}
                  className="text-green-700 mr-1"
                />
                <span>{foodPost.servings} Serving(s)</span>
              </span>
            </p>
            <p className="flex justify-center text-xl font-semibold text-slate-600 ">
              DESCRIPTION :{" "}
            </p>
            <p className="flex justify-center text-lg font-medium">
              {" "}
              {foodPost.description}{" "}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <Icon path={mdiMapMarker} size={1} className="text-green-700" />
              <span className="font-semibold text-slate-600 w-40">
                PICKUP ADDRESS
              </span>
              {foodPost.pickupAddress}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <Icon path={mdiPhone} size={1} className="text-green-700" />
              <span className="font-semibold text-slate-600 w-40">CONTACT</span>
              <span>{foodPost.primaryContact}</span>
            </p>
            {foodPost.alternateContact && (
              <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                <Icon path={mdiPhone} size={1} className="text-green-700" />
                <span className="font-semibold text-slate-600 w-40">
                  ALTERNATE CONTACT
                </span>

                <span>{foodPost.alternateContact}</span>
              </p>
            )}
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <Icon
                path={mdiClockOutline}
                size={1}
                className="text-green-700"
              />
              <span className="font-semibold text-slate-600 w-40">
                TIME ELAPSED
              </span>

              <span>
                {foodPost.hoursElapsed +
                  calculateElapsedHours(foodPost.createdAt)}{" "}
                hr(s)
              </span>
            </p>
            {currentUser &&
              foodPost.userRef === currentUser._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="flex justify-center text-white p-3 rounded-3xl uppercase hover:opacity-75 disabled:opacity-50 bg-lime-700 w-80 mx-auto"
                >
                  EMAIL PUBLISHER
                  <Icon
                    path={mdiEmailArrowRightOutline}
                    size={1}
                    className="ml-4"
                  />
                </button>
              )}
            {contact && (
              <MailToPublisher
                publisherUsername={foodPost.publisherUsername}
                publisherEmail={foodPost.publisherEmail}
                foodPostName={foodPost.name}
                onCancel={handleTextAreaClose}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
