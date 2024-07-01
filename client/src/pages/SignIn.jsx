import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import GoogleAuth from "../components/GoogleAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const nav = useNavigate();
  const handleSigninData = async (event) => {
    setLoading(true);
    try {
      const postResponse = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await postResponse.json();
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      } else {
        dispatch(setUser(data))
        setError(null);
        nav("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-lime-700">
        Sign In
      </h1>
      <form className="flex flex-col gap-4">
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
        <button
          disabled={loading}
          className="bg-lime-300 text-lime-800 p-3 rounded-3xl uppercase hover:opacity-75 disabled:opacity-50"
          onClick={handleSigninData}
        >
          {!loading ? "Sign In" : "Verifying credentials..."}
        </button>
        <GoogleAuth />
      </form>
      <div className="flex mt-5">
        <div className="flex mx-auto gap-4">
          <p>Don't have an account ?</p>
          <Link to={"/sign-up"}>
            <span className="text-lime-700 font-bold">Sign up</span>
          </Link>
        </div>
      </div>
      {error && (
        <div
          className="flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4"
          role="alert"
        >
          <div className="mx-auto">
            <strong className="font-bold">Error ! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
