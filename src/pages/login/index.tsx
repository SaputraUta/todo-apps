import InputLogin from "@/components/InputLogin";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkTokenWithAPI = async () => {
      try {
        setIsChecking(true);
        const response = await axios.get("https://todo-apps-ochre.vercel.app/api/me");
        if (response.data.user) {
          router.push("/");
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log("Unauthorized");
        }
      } finally {
        setIsChecking(false);
      }
    };
    checkTokenWithAPI();
  }, []);

  if (isChecking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <InputLogin />
    </div>
  );
}
