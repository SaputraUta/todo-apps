import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { showFormattedDate } from "../utils/showFormattedDate";

interface Props {
  title: string;
  deadline: string;
}

export default function TodoCart({ title, deadline }: Props) {
  return (
    <div className="flex justify-between items-center w-full bg-slate-200 rounded-lg">
      <div className="py-4 px-4 flex flex-col gap-1 w-5/6">
        <h3 className="text-sm sm:text-base md:text-lg font-medium tracking-wider text-slate-900 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-slate-900 opacity-75">
          Deadline: {showFormattedDate(deadline)}
        </p>
      </div>
      <div className="flex gap-2 py-4 px-4">
        <DeleteButton />
        <EditButton />
      </div>
    </div>
  );
}
