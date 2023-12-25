import InputRegister from "@/components/InputRegister";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function register() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkTokenWithAPI = async () => {
      try {
        setIsChecking(true);
        const response = await axios.get("http://localhost:3000/api/me");
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
      <InputRegister />
    </div>
  );
}
