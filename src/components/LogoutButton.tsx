import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  async function onLogoutHandler() {
    setIsLoading(true);
    const response = await axios.get("http://localhost:3000/api/logout");
    setIsLoading(false);
    router.push("/login");
  }

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && logoutModal) {
        setLogoutModal(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [logoutModal]);

  return (
    <>
      {isLoading && (
        <div className="flex gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full border-t-2 border-r-2 border-slate-900 animate-spin" />
          <p className="text-sm sm:text-base text-slate-900">Logging out...</p>
        </div>
      )}
      <button onClick={() => setLogoutModal(true)} className="hover:scale-105">
        <FiLogOut size={25} />
      </button>
      {logoutModal && (
        <div className="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="w-3/4 md:w-1/2 h-1/4 rounded-lg bg-slate-200 relative">
            <button
              onClick={() => setLogoutModal(false)}
              className="hover:scale-105 absolute top-1 left-[88%] sm:left-[90%]"
            >
              <IoClose size={25} />
            </button>
            <div className="p-10">
              <p className="text-center pb-5 font-medium tracking-wider text-sm sm:text-base md:text-lg lg:text-xl text-slate-900">Are you sure want to log out?</p>
              <div className="self-center left-[43%] sm:left-1/2 flex justify-center items-center gap-5">
                <button
                  onClick={onLogoutHandler}
                  className="bg-slate-900 text-slate-100 py-2 px-10 sm:px-14 lg:px-16 rounded-lg text-sm sm:text-base font-medium"
                >
                  Yes
                </button>
                <button
                  onClick={() => setLogoutModal(false)}
                  className="text-slate-900 bg-slate-100 border-2 border-slate-900 py-2 px-10 sm:px-14 lg:px-16 rounded-lg text-sm sm:text-base font-medium"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
