import UserContext from "@/context/userContext";
import Header from "./Header";
import Navigation from "./Navigation";
import TodoList from "./TodoList";
import { useContext } from "react";

export default function TodoApp() {
  const user = useContext(UserContext);
  return (
    <>
      <Header />
      <Navigation />
      <TodoList />
    </>
  );
}
