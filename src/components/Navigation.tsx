import { IoIosAddCircle } from "react-icons/io";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center mt-16 w-5/6">
      <div className="flex flex-col gap-1">
        <p className="text-lg font-medium tracking-wider">Hello, Saputra!</p>
        <p className="text-sm font-light tracking-wider">Todo list</p>
      </div>
      <IoIosAddCircle size={25} />
    </nav>
  );
}
