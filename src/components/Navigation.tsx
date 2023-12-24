import UserContext from "@/context/userContext";
import { useContext } from "react";
import { IoIosAddCircle } from "react-icons/io";

export default function Navigation() {
  const user = useContext(UserContext);
  return (
    <nav className="flex justify-between items-center mt-10 w-5/6">
      <div className="flex flex-col gap-1">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wider">
          Hello, {user.username}!
        </p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wider">
          Todo list
        </p>
      </div>
      <button>
        <IoIosAddCircle size={25} />
      </button>
    </nav>
  );
}
