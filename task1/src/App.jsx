import { useEffect, useState } from "react";
import biticon from "./assets/bitexelicon.jpg";
import png from "./assets/png-removebg-preview.png";
import { CiLight } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import im from "./assets/loginside.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod"; // Import Zod Resolver
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute"; // Correct path if the file is in the same directory

// Step 1: Define Zod schema
const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"), // Email validation
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"), // Password length validation
});

const signupSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function AuthPage() {
  const [formType, setFormType] = useState("login"); // State to manage form type
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  if(token){
    navigate("/dashboard")
  }
  const form = useForm({
    resolver: zodResolver(formType === "login" ? schema : signupSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data) => {
    if (formType === "signup") {
      try {
        // API call to the backend
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
              confirmPassword: data.confirmPassword,
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert(result.message); // Show success message
          setFormType("login"); // Switch to the login form
        } else {
          alert(result.message); // Show error message if any
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Error during signup");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // Successfully logged in
          console.log(result.token);
          localStorage.setItem("authToken", result.token);

          alert("Login successful!");
          navigate("/dashboard");
          // Optionally, store the JWT token in localStorage or sessionStorage
          // localStorage.setItem('authToken', result.token);
        } else {
          // Error during login
          alert(result.message || "Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login");
      }
    }
  };

  const toggleForm = () => {
    setFormType(formType === "login" ? "signup" : "login");
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === "dark";
    }

    // If no theme is stored, use the system preference (default to dark mode if the system prefers dark)
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
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

  useEffect(() => {
    reset();
  }, [formType]);

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
            <li
              className={`${
                formType === "login"
                  ? "bg-amber-400 rounded-1xl m-2 px-2 rounded-md text-black"
                  : ""
              } hover:cursor-pointer`}
              onClick={() => setFormType("login")}
            >
              Log in
            </li>
            <li
              className={`${
                formType === "signup"
                  ? "bg-amber-400 rounded-1xl m-2 px-2 rounded-md text-black"
                  : ""
              } hover:cursor-pointer`}
              onClick={() => setFormType("signup")}
            >
              Sign Up
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
          <p className=" font-bold">
            {" "}
            {formType === "login" ? "Log in" : "Sign Up"}
          </p>
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
            {formType === "signup" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="font-sans">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="confirm password"
                  className={`outline-none border-1 border-solid border-gray-500 p-1 rounded-sm ${
                    isDarkMode ? "placeholder:text-white" : ""
                  }`}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
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
              {formType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                className={`${
                  isDarkMode ? "text-white" : "text-black"
                } hover:cursor-pointer`}
                onClick={toggleForm}
              >
                {formType === "login" ? "SignUp now" : "Login"}
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;
