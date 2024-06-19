import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-lime-700">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 px-5 rounded-3xl bg-lime-100 focus:outline-lime-500 text-lime-800"
          id="username"
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border p-3 px-5 rounded-3xl  bg-lime-100  focus:outline-lime-500 text-lime-800"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 px-5 rounded-3xl  bg-lime-100  focus:outline-lime-500 text-lime-800"
          id="password"
        />
        <button className="bg-lime-300 text-lime-800 p-3 rounded-3xl uppercase hover:opacity-75 disabled:opacity-50">
          Sign up
        </button>
      </form>
      <div className="flex mt-5">
        <div className="flex mx-auto gap-4">
        <p>Already have an account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-lime-700 font-bold">Sign in</span>
        </Link>
        </div>
      </div>
    </div>
  );
}
