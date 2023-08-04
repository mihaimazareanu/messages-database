"use client";

import { FormEvent, useRef, useState } from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";
import "../../styles/login.scss";

type LoginInputRefs = {
  username: HTMLInputElement | null;
  password: HTMLInputElement | null;
};

const LoginComponent = () => {
  const inputRef = useRef<LoginInputRefs>({
    username: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = inputRef.current;
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("jwtToken") || "",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("jwtToken:", token);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <form
        className="flex flex-col m-4 border border-primary rounded-xl text-primary p-4"
        onSubmit={loginUser}
      >
        <fieldset className="border-none w-full flex justify-between items-center mb-4">
          <p>Username:</p>
          <input
            required
            id="username"
            type="text"
            placeholder="Type your username..."
            ref={(ref) => {
              inputRef.current.username = ref;
            }}
            className="w-4/5 border border-none rounded-full text-primary pl-4 pr-4 bg-backgroundSecondary ml-4 placeholder-primary focus:outline-none placeholder:text-xs"
          />
        </fieldset>
        <fieldset className="border-none w-full flex justify-between items-center mb-4 relative">
          <p>Password:</p>
          <input
            required
            id="password"
            placeholder="Type your password..."
            type={showPassword ? "text" : "password"}
            ref={(ref) => {
              inputRef.current.password = ref;
            }}
            className="w-full border border-none rounded-full text-primary pl-4 pr-14 bg-backgroundSecondary ml-4 placeholder-primary focus:outline-none placeholder:text-xs"
          />
          {showPassword ? (
            <BiHide
              size="1.2rem"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer fill-secondary"
            />
          ) : (
            <BiShowAlt
              size="1.2rem"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer fill-secondary"
            />
          )}
        </fieldset>
        {error && <p className="login-error">{error}</p>}
        <button
          type="submit"
          className="flex w-28 bg-secondary border-none rounded-full text-primary justify-center items-center p-1 mr-4 mt-4 self-center"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
