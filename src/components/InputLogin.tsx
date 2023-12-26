import useInput from "@/hooks/useInput";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function InputLogin() {
  const router = useRouter();
  const { value: email, onChange: onEmailChange } = useInput("");
  const { value: password, onChange: onPasswordChange } = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    setErrorMessage("");
    setIsLoading(true);
    e.preventDefault();
    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      const formDataJSON = Object.fromEntries(formData.entries());
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formDataJSON
      );
      setIsLoading(false);
      router.push("/");
      formElement.reset();
    } catch (error: any) {
      setIsLoading(false);
      if (error.response.status === 400) {
        setErrorMessage("Email not found.");
      } else if (error.response.status === 401) {
        setErrorMessage("Wrong password.");
      } else setErrorMessage("An error occured, please try again later.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-5/6 gap-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-slate-900">
          Sign in
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-75 text-slate-900 text-center">
          Enter your username and password to sign in
        </p>
      </div>
      {errorMessage && (
        <p className="text-sm sm:text-base text-red-500">{errorMessage}</p>
      )}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center justify-center gap-2 w-full mt-5 max-w-2xl"
      >
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
            <p className="text-sm sm:text-base text-slate-900">Logging in</p>
          </div>
        ) : null}
        <CustomButton text="Login" />
      </form>
      <p className="text-slate-900 text-sm sm:text-base opacity-75">
        Don&apos;t have any account yet?
        <Link href="/register" className="underline">
          {" "}
          register here
        </Link>
      </p>
    </div>
  );
}
