import { IoClose } from "react-icons/io5";
import { getCurrentDate } from "../utils/getCurrentDate";
import { FormEvent, useContext, useState } from "react";
import CustomButton from "./CustomButton";
import UserContext from "@/context/userContext";
import axios from "axios";
import { getData } from "@/utils/getData";
import TodoContext from "@/context/todosContext";

interface Props {
  onEditSuccess: () => void;
  id: string;
  initialTitle: string;
  initialDeadline: string;
}

interface Todos {
  id: string;
  title: string;
  deadline: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: String;
}

export default function EditModal({
  onEditSuccess,
  id,
  initialTitle,
  initialDeadline,
}: Props) {
  const [deadline, setDeadline] = useState(initialDeadline);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [todo, setTodo] = useState(initialTitle);
  const user = useContext(UserContext);
  const { setTodos } = useContext(TodoContext);

  async function updateTodoHandler(id: string, e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setIsEditingTodo(true);
    try {
      const formData = new FormData();
      formData.append("title", todo);
      formData.append("todoId", id);
      const ISOTypeDeadline = new Date(deadline).toISOString();
      formData.append("deadline", ISOTypeDeadline);
      const formDataJSON = Object.fromEntries(formData.entries());
      const response = await axios.put(
        "https://todo-apps-ochre.vercel.app/api/todo",
        formDataJSON
      );
      const todos = await getData(user.id);
      setTodos(todos);
      setIsEditingTodo(false);
      onEditSuccess();
    } catch (error: any) {
      setIsEditingTodo(false);
      if (error.response.message === 401) {
        setErrorMessage("Unauthorized");
      } else setErrorMessage("Something went wrong, please try again later");
    }
  }

  return (
    <div className="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="w-3/4 md:w-1/2 h-1/4 rounded-lg bg-slate-200">
        <div className="p-4 flex flex-col">
          <button
            onClick={() => onEditSuccess()}
            className="self-end hover:scale-105"
          >
            <IoClose size={25} />
          </button>

          <form
            onSubmit={(e) => updateTodoHandler(id, e)}
            className="flex flex-col gap-5 w-full"
          >
            <div>
              <label
                htmlFor="title"
                className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-900"
              >
                Todo name
              </label>
              <input
                name="title"
                id="title"
                type="text"
                placeholder="Todo"
                required
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="w-full text-sm sm:text-base md:text-lg lg:text-xl p-1 rounded-lg focus:outline-none text-slate-900"
              />
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-900"
              >
                Deadline
              </label>
              <input
                name="deadline"
                id="deadline"
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={getCurrentDate()}
                className="w-full text-sm sm:text-base md:text-lg lg:text-xl p-1 rounded-lg focus:outline-none text-slate-900"
              />
            </div>
            <CustomButton text="Add" />
          </form>

          {isEditingTodo && (
            <div className="flex gap-2 mt-5 justify-center items-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full border-t-2 border-r-2 border-slate-900 animate-spin" />
              <p className="text-sm sm:text-base text-slate-900">
                Updating todo...
              </p>
            </div>
          )}

          {errorMessage && (
            <p className="text-center mt-5 text-red-500 text-sm sm:text-base">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
