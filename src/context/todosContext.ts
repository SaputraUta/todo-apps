// TodoContext.tsx

import React from "react";

interface Todos {
  id: string;
  title: string;
  deadline: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: String;
}


interface TodosContextProps {
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const defaultTodos: Todos[] = [];

const TodoContext = React.createContext<TodosContextProps>({
  todos: defaultTodos,
  setTodos: () => {},
});

export default TodoContext;
