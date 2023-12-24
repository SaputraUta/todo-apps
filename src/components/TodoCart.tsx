import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface Props {
  title?: string;
}

export default function TodoCart({ title }: Props) {
  return (
    <div className="flex justify-between items-center w-full bg-slate-200 rounded-lg">
      <h3 className="py-4 px-4 text-sm sm:text-base md:text-lg font-medium tracking-wider text-slate-900 w-3/4 overflow-hidden whitespace-nowrap overflow-ellipsis">
        Mencuci baju
      </h3>
      <div className="flex gap-2 py-4 px-4">
        <DeleteButton />
        <EditButton />
      </div>
    </div>
  );
}
