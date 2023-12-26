import useInput from "@/hooks/useInput";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function InputRegister() {
  const { value: username, onChange: onUsernameChange } = useInput("");
  const { value: email, onChange: onEmailChange } = useInput("");
  const { value: password, onChange: onPasswordChange } = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    setErrorMessage(""); // Reset error message
    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      const formDataJSON = Object.fromEntries(formData.entries());
      const response = await axios.post(
        "https://todo-apps-ochre.vercel.app/api/register",
        formDataJSON
      );
      setIsLoading(false);
      setSuccessMessage("Registration Success");
      formElement.reset();
    } catch (error: any) {
      setIsLoading(false);
      if (error.response.status === 400) {
        setErrorMessage(
          "Email is already in use. Please use a different email."
        );
      } else if (error.response.status === 403) {
        setErrorMessage("Password must be at least 8 characters long");
      } else if (error.response.status === 500) {
        setErrorMessage("Internal server error. Please try again later.");
      } else {
        setErrorMessage("An error occurred during registration.");
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-5/6 gap-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-slate-900">
          Sign up
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-75 text-slate-900 text-center">
          Fill in the form below to register your account
        </p>
      </div>
      {successMessage && (
        <p className="text-sm sm:text-base text-green-500">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-sm sm:text-base text-red-500">{errorMessage}</p>
      )}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center justify-center gap-2 w-full mt-5 max-w-2xl"
      >
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={onUsernameChange}
          className="w-full border-2 border-slate-900 p-1 rounded-lg focus:outline-none text-sm sm:text-base"
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          className="w-full border-2 border-slate-900 p-1 rounded-lg focus:outline-none text-sm sm:text-base"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          className="w-full border-2 border-slate-900 p-1 rounded-lg focus:outline-none mb-5 text-sm sm:text-base"
          placeholder="Password"
          required
        />
        {isLoading ? (
          <div className="flex gap-2 mb-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full border-t-2 border-r-2 border-slate-900 animate-spin" />
            <p className="text-sm sm:text-base text-slate-900">
              Registering account
            </p>
          </div>
        ) : null}
        <CustomButton text="Sign up" />
      </form>
      <p className="text-slate-900 text-sm sm:text-base opacity-75">
        Already have an account?
        <Link href="/login" className="underline">
          {" "}
          login here
        </Link>
      </p>
    </div>
  );
}
