import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-slate-100 w-full">
      <Header/>
      <Navigation/>
    </main>
  );
}
