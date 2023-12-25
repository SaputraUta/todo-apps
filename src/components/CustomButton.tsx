interface Props {
  text: string;
}

export default function CustomButton({ text }: Props) {
  return (
    <button
      type="submit"
      className="w-full bg-slate-900 text-white rounded-lg px-10 py-2 font-bold tracking-wider text-sm sm:text-base md:text-lg"
    >
      {text}
    </button>
  );
}
