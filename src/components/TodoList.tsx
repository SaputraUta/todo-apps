import TodoCart from "./TodoCart";

export default function TodoList() {
  return (
    <div className="mt-5 w-5/6 flex flex-col gap-4">
      <TodoCart />
      <TodoCart />
      <TodoCart />
      <TodoCart />
      <TodoCart />
    </div>
  );
}
