import biticon from "./assets/bitexelicon.jpg";
import theme from "./assets/summer.png";
import message from "./assets/message.png";
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
    .min(6, "Password must be at least 6 characters"),// Password length validation
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

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <div className="flex flex-row justify-between bg-gray-800 text-white text-sm font-light rounded-none items-center p-1">
        <div>
          <ul className="flex gap-2">
            <li>
              <img
                src={biticon}
                alt="image"
                className="h-6 w-max ml-1 bg-gray-900 rounded-4xl"
              />
            </li>
            <li>Dashboard</li>
            <li>spot</li>
            <li>wallet</li>
            <li>Markets</li>
            <li>History</li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-2 items-center">
            <li>
              <img src={message} alt="image" className="h-6" />
            </li>
            <li>Log in</li>
            <li className="bg-amber-400 rounded-1xl m-2 px-2 rounded-md text-black">
              Sign up
            </li>
            <li>
              <img
                src={theme}
                alt="image"
                className="h-8 bg-white mr-4 rounded-full"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly items-center">
        <div>
          <img src={im} alt="Image" className="w-3/4 h-full" />
        </div>
        <div className="flex flex-col gap-5">
          <img
            src={biticon}
            alt="image"
            className="h-25 ml-1 bg-gray-900 rounded-4xl"
          />
          <p className=" font-bold">Login</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-amber-100/35  p-5 rounded-sm flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email/Username</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email "
                className="outline-none border-1 border-solid border-gray-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="email"
                id="password"
                placeholder="password"
                className="outline-none border-1 border-solid border-gray-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <p>Forget passord?</p>
            </div>
            <button
              type="submit"
              className=" bg-amber-500 px-1 rounded-sm w-full"
            >
              Submit
            </button>
            <p>Don't have an account? Sign Up now</p>
          </form>
        </div>
      </div>
      <div className="flex justify-center bg-gray-800">
        <p className="text-white">@2025 Bitexel copyrights</p>
      </div>
    </div>
  );
}

export default App;
