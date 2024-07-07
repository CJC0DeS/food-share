import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FoodPosting() {
  const [images, setimages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: [],
    name: "",
    description: "",
    pickupAddress: "",
    mealType: "",
    primaryContact: "",
    alternateContact: "",
    servings: "",
    hoursElapsed: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadingStatus, setImageUploadingStatus] = useState(false);
  const [postError, setPostError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageNameList, setImageNameList] = useState([]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleImagesSubmit = async (e) => {
    setImageUploadingStatus(true);
    if (images.length > 0 && images.length < 7) {
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrl: formData.imageUrl.concat(urls),
        });
        setImageUploadError(null);
      } catch (err) {
        setImageUploadError("IMAGE UPLOAD FAILED: MAX IMAGE SIZE 2MB");
      }
    } else {
      if (images.length === 0)
        setImageUploadError("UPLOAD ATLEAST 1 IMAGE TO CONTINUE");
      else
        setImageUploadError(
          "IMAGE UPLOAD FAILED: CANNOT UPLOAD MORE THAN 6 IMAGES"
        );
    }
    setImageUploadingStatus(false);
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      setImageNameList((prevImageNameList) => [
        ...prevImageNameList,
        file.name,
      ]);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleSubmit = async () => {
    try {
      if (formData.imageUrl.length < 1)
        return setPostError(
          "POST CREATION FAILED: UPLOAD ATLEAST 1 IMAGE TO CONTINUE"
        );
      setLoading(true);
      setPostError(false);
      const res = await fetch("/api/foodpost/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setPostError(data.message);
      }
      navigate(`/listing/user/${data._id}`);
    } catch (error) {
      setPostError(error.message);
      setLoading(false);
    }
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((_, i) => i !== index),
    });
  };
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
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Description:</p>
            <textarea
              type="text"
              placeholder="Description (Add description about the contents, include potential allergens)"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="description"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Your Address:</p>
            <input
              type="text"
              placeholder="Your Address (Pickup address)*"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="pickupAddress"
              required
              onChange={handleChange}
              value={formData.pickupAddress}
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Meal Type:</p>
            <input
              type="text"
              placeholder="Meal Type"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="mealType"
              onChange={handleChange}
              value={formData.mealType}
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Contact Number:</p>
            <input
              type="Number"
              required
              placeholder="Contact Number*"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="primaryContact"
              onChange={handleChange}
              value={formData.primaryContact}
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Alt. Contact Number:</p>
            <input
              type="Number"
              required
              placeholder="Alternate Contact Number"
              className="w-full border p-3 rounded-lg  bg-lime-100 focus:outline-lime-500 text-lime-800"
              id="alternateContact"
              onChange={handleChange}
              value={formData.alternateContact}
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
              onChange={handleChange}
              value={formData.servings}
            />
          </div>
          <div className="flex">
            <p className="my-auto mr-2 w-32">Hours elapsed:</p>
            <input
              placeholder="Hours elapsed after cooking*"
              type="number"
              id="hoursElapsed"
              min="0"
              max="24"
              required
              className="p-3 border border-gray-300 rounded-lg bg-lime-100 w-full"
              onChange={handleChange}
              value={formData.hoursElapsed}
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
              onChange={(e) => {
                setimages(e.target.files);
              }}
            />
            <button
              disabled={imageUploadingStatus}
              onClick={handleImagesSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {!imageUploadingStatus ? "Upload" : "Uploading..."}
            </button>
          </div>
          {imageUploadError && (
            <div
              className="flex mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4"
              role="alert"
            >
              <div className="mx-auto">
                <strong className="font-bold">Error ! </strong>
                <span className="block sm:inline">{imageUploadError}</span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {formData.imageUrl.length > 0 &&
              formData.imageUrl.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="Food List Image"
                    className="w-20 h-20 object-contain rounded-lg mr-2"
                  />
                  <p className="block sm:hidden lg:block">
                    {imageNameList[index]}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    <Icon path={mdiTrashCanOutline} size={1} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </form>
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={loading || imageUploadingStatus}
          className=" mx-auto flex flex-row justify-center align-center p-3 bg-lime-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-64"
        >
          {!loading ? "Create Post" : "Hold on..."}
        </button>
      </div>
      {postError && (
        <div
          className="flex mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 max-w-fit"
          role="alert"
        >
          <div className="mx-auto">
            <strong className="font-bold">Error ! </strong>
            <span className="block sm:inline">{postError}</span>
          </div>
        </div>
      )}
    </main>
  );
}
