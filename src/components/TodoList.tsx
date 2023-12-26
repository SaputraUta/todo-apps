import { FormEvent, useContext, useEffect, useState } from "react";
import TodoCart from "./TodoCart";
import axios from "axios";
import UserContext from "@/context/userContext";
import CustomButton from "./CustomButton";
import { IoClose } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { getCurrentDate } from "../utils/getCurrentDate";
import TodoContext from "@/context/todosContext";
import LogoutButton from "./LogoutButton";

interface Todos {
  id: string;
  title: string;
  deadline: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: String;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [noteModal, setNoteModal] = useState(false);
  const [todo, setTodo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialErrorMessage, setInitialErrorMessage] = useState("second");
  const [processMessage, setProcessMessage] = useState("");
  const [errorProcessMessage, setErrorProcessMessage] = useState("");
  async function getData() {
    setInitialErrorMessage("");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://todo-apps-ochre.vercel.app/api/todo?userId=${user.id}`
      );
      setTodos(response.data.todos);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error.response.message === 401) {
        setInitialErrorMessage("Unauthorized");
      } else {
        setInitialErrorMessage("Something went wrong, please try again later");
      }
    }
  }

  async function addTodoHandler(e: FormEvent) {
    e.preventDefault();
    setIsAddingTodo(true);
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("title", todo);
      formData.append("userId", user.id);
      const ISOTypeDeadline = new Date(deadline).toISOString();
      formData.append("deadline", ISOTypeDeadline);
      const formDataJSON = Object.fromEntries(formData.entries());
      const response = await axios.post(
        "https://todo-apps-ochre.vercel.app/api/todo",
        formDataJSON
      );
      updateTodos(response);
      setIsAddingTodo(false);
      setNoteModal(false);
      setDeadline("");
      setTodo("");
    } catch (error: any) {
      setIsAddingTodo(false);
      setDeadline("");
      setTodo("");
      if (error.response.message === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
    }
  }

  function updateTodos(response: { data: { todos: Todos } }) {
    const tmp = [...todos];
    tmp.push(response.data.todos);
    setTodos(tmp);
  }

  async function deleteTodoHandler(id: string) {
    setProcessMessage("");
    setErrorProcessMessage("");
    try {
      setProcessMessage("Deleting todo...");
      const response = await axios.delete(
        `https://todo-apps-ochre.vercel.app/api/todo?todoId=${id}`
      );
      const temp = todos.filter((item) => item.id !== response.data.id);
      setTodos(temp);
      setProcessMessage("");
    } catch (error: any) {
      setProcessMessage("");
      if (error.response.message === 400) {
        setErrorProcessMessage("Bad request.");
      } else setErrorProcessMessage("Something went wrong, try again later.");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && noteModal) {
        setNoteModal(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [noteModal]);

  if (isLoading) {
    return (
      <div className="flex gap-2 mt-5 justify-center items-center">
        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full border-t-2 border-r-2 border-slate-900 animate-spin" />
        <p className="text-sm sm:text-base text-slate-900">Loading todo...</p>
      </div>
    );
  }

  if (initialErrorMessage) {
    return (
      <div className="flex mt-5 justify-center items-center">
        <p className="text-sm sm:text-base text-red-500">
          {initialErrorMessage}
        </p>
      </div>
    );
  }

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <nav className="flex justify-between items-center mt-10 w-5/6">
        <div className="flex flex-col gap-1">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wider">
            Hello, {user.username}!
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wider">
            Todo list
          </p>
        </div>
        <div className="flex gap-10">
          <button
            onClick={() => setNoteModal(true)}
            className="hover:scale-105"
          >
            <IoIosAddCircle size={25} />
          </button>
          <LogoutButton />
        </div>
      </nav>
      {processMessage && (
        <p className="text-center mt-5 text-slate-900 text-sm sm:text-base">
          {processMessage}
        </p>
      )}
      {errorProcessMessage && (
        <p className="text-center mt-5 text-red-500 text-sm sm:text-base">
          {errorProcessMessage}
        </p>
      )}

      {noteModal && (
        <div className="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="w-3/4 md:w-1/2 h-1/4 rounded-lg bg-slate-200">
            <div className="p-4 flex flex-col">
              <button
                onClick={() => setNoteModal(false)}
                className="self-end hover:scale-105"
              >
                <IoClose size={25} />
              </button>

              <form
                onSubmit={addTodoHandler}
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
                    required
                    placeholder="Todo"
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

              {isAddingTodo && (
                <div className="flex gap-2 mt-5 justify-center items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full border-t-2 border-r-2 border-slate-900 animate-spin" />
                  <p className="text-sm sm:text-base text-slate-900">
                    Adding todo...
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
      )}
      {todos.length < 1 && (
        <p className="text-sm sm:text-base text-center font-medium mt-5">
          No todos.
        </p>
      )}

      <div className="mt-5 w-5/6 flex flex-col gap-4">
        {todos?.map((todo) => (
          <TodoCart
            key={todo.id}
            id={todo.id}
            onDelete={deleteTodoHandler}
            title={todo.title}
            deadline={todo.deadline}
          />
        ))}
      </div>
    </TodoContext.Provider>
  );
}
