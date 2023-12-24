export default function Header() {
  return (
    <header className="flex flex-col items-center">
      <h1 className="font-bold tracking-widest text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900">
        Todo apps
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-75 text-slate-900 tracking-wider">
        Create your todo list easily!
      </p>
    </header>
  );
}
