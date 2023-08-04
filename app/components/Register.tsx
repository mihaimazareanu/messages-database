"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";

type RegisterInputRefs = {
  username: HTMLInputElement | null;
  password: HTMLInputElement | null;
  confPassword: HTMLInputElement | null;
};

const RegisterComponent = () => {
  const inputRef = useRef<RegisterInputRefs>({
    username: null,
    password: null,
    confPassword: null,
  });

  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confPassword: boolean;
  }>({ password: false, confPassword: false });

  const [error, setError] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false,
  });

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password, confPassword } = inputRef.current;

    if (!username || !password || !confPassword) {
      throw new Error("You must fill in all the fields");
    }

    if (password?.value !== confPassword?.value) {
      setError({ username: false, password: true });
      return;
    }

    const res = await fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      setError({ username: true, password: false });
    } else {
      setError({ username: false, password: false });
      username.value = "";
      password.value = "";
      confPassword.value = "";
    }
  };

  useEffect(() => {
    if (error.username) {
      inputRef.current.username?.focus();
    }
  }, [error.username]);

  return (
    <div className="flex flex-col h-full">
      <form
        className="flex flex-col m-4 border border-primary rounded-xl text-primary p-4"
        onSubmit={addUser}
      >
        <fieldset className="border-none w-full flex justify-between items-center mb-4">
          <p>Username:</p>
          <input
            required
            id="username"
            type="text"
            placeholder="Choose a username..."
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
            placeholder="Choose a password..."
            type={showPassword.password ? "text" : "password"}
            ref={(ref) => {
              inputRef.current.password = ref;
            }}
            className="w-full border border-none rounded-full text-primary pl-4 pr-14 bg-backgroundSecondary ml-4 placeholder-primary focus:outline-none placeholder:text-xs"
          />
          {showPassword.password ? (
            <BiHide
              size="1.2rem"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                })
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer fill-secondary"
            />
          ) : (
            <BiShowAlt
              size="1.2rem"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                })
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer fill-secondary"
            />
          )}
        </fieldset>
        <fieldset
          id="confPassword"
          className="border-none w-full flex justify-between items-center relative"
        >
          <p>Confirm Password:</p>
          <input
            required
            placeholder="Confirm your password..."
            type={showPassword.confPassword ? "text" : "password"}
            ref={(ref) => {
              inputRef.current.confPassword = ref;
            }}
            className="w-full border border-none rounded-full text-primary pl-4 pr-4 bg-backgroundSecondary ml-4 placeholder-primary focus:outline-none placeholder:text-xs"
          />
          {showPassword.confPassword ? (
            <BiHide
              size="1.2rem"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confPassword: !showPassword.confPassword,
                })
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer fill-secondary"
            />
          ) : (
            <BiShowAlt
              size="1.2rem"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confPassword: !showPassword.confPassword,
                })
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer fill-secondary"
            />
          )}
        </fieldset>
        {error.password && (
          <p className="text-xs text-red-500 bg-primary border-none rounded p-2 mt-4 mb-4 self-center">
            Passwords don&apos;t match.
          </p>
        )}
        {error.username && (
          <p className="text-xs text-red-500 bg-primary border-none rounded p-2 mt-4 mb-4 self-center">
            Username already exists. Please choose a different username.
          </p>
        )}
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

export default RegisterComponent;
