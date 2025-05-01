import { useEffect, useState } from "react";
import biticon from "./assets/bitexelicon.jpg";
import png from "./assets/png-removebg-preview.png";
import { CiLight } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import im from "./assets/loginside.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod"; // Import Zod Resolver

// Step 1: Define Zod schema
const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"), // Email validation
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"), // Password length validation
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Connect Zod schema to React Hook Form
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
  };
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`flex flex-col h-screen overflow-auto ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-row justify-between bg-black  text-white text-sm font-light rounded-none items-center p-1">
        <div>
          <ul className="flex gap-3">
            <li>
              <img src={png} alt="image" className="h-6 w-max ml-1" />
            </li>
            <li>Dashboard</li>
            <li>spot</li>
            <li>wallet</li>
            <li>Markets</li>
            <li>History</li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-3 items-center">
            <li>
              <FiMessageCircle className="h-6 w-6 text-white dark:text-black" />
            </li>
            <li>Log in</li>
            <li className="bg-amber-400 rounded-1xl m-2 px-2 rounded-md text-black">
              Sign up
            </li>
            <li>
              <CiLight
                onClick={toggleDarkMode}
                className="h-6 w-6 text-white hover:cursor-pointer"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <div>
          <img src={im} alt="Image" className="w-3/4 h-full" />
        </div>
        <div className="flex flex-col gap-5 dark:bg-gray-900">
          <img
            src={biticon}
            alt="image"
            className="h-25 ml-1 bg-white rounded-4xl "
          />
          <p className=" font-bold">Login</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${
              isDarkMode ? "bg-gray-900" : "bg-amber-100/35 "
            } p-5 rounded-sm flex flex-col gap-2`}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans">
                Email/Username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email "
                className={`outline-none border-1 border-solid border-gray-500 p-1 rounded-sm placeholder:white ${
                  isDarkMode ? "placeholder:text-white" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-sans">
                Password
              </label>
              <input
                type="password"
                name="email"
                id="password"
                placeholder="password"
                className={`outline-none border-1 border-solid border-gray-500 p-1 rounded-sm placeholder:white ${
                  isDarkMode ? "placeholder:text-white" : ""
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <p className={`${isDarkMode}:"text-gray-500":"text-white"`}>
                Forget Password?
              </p>
            </div>
            <button
              type="submit"
              className=" bg-amber-500 px-1 rounded-sm w-full hover:cursor-pointer"
            >
              Submit
            </button>
            <p className={`text-sm ${isDarkMode}:"text-gray-500":"text-white"`}>
              Don't have an account?{" "}
              <span className={`isDarkMode?"text-white":"text-black"`}>
                Sign Up now
              </span>
            </p>
          </form>
        </div>
      </div>
      <div className="flex justify-center bg-black absolute bottom-0 w-full">
        <p className="text-white">@2025 Bitexel copyrights</p>
      </div>
    </div>
  );
}

export default App;
