import useInput from "@/hooks/useInput";
import CustomButton from "./CustomButton";

export default function InputLogin() {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
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
      <form className="flex flex-col items-center justify-center gap-2 w-full mt-5 max-w-2xl">
        <input
          type="email"
          name="email"
          id="email"
          className="w-full border-2 border-slate-900 p-1 rounded-lg focus:outline-none text-sm sm:text-base"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          className="w-full border-2 border-slate-900 p-1 rounded-lg focus:outline-none mb-5 text-sm sm:text-base"
          placeholder="Password"
        />
        <CustomButton text="Login" />
      </form>
    </div>
  );
}
