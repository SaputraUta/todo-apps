import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import TodoList from "@/components/TodoList";
import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "@/context/userContext";
import TodoApp from "@/components/TodoApp";
import Link from "next/link";

interface User {
  id: string;
  username: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/me");
        setUser(response.data.user);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        if (error.response.status === 401) {
          console.error("Unauthorized");
        }
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full border-t-2 border-r-2 border-slate-900 animate-spin" />
        <p className="text-sm sm:text-base text-slate-900">
          Loading user data...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 w-full">
        <Header />
        <div className="mt-16" />
        <Link
          href="/login"
          className="bg-slate-900 hover:bg-slate-800 hover:cursor-pointer px-10 py-3 text-slate-100 font-bold tracking-widest rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <main className="min-h-screen flex flex-col items-center bg-slate-100 w-full">
        <div className="mt-16" />
        <TodoApp />
      </main>
    </UserContext.Provider>
  );
}
