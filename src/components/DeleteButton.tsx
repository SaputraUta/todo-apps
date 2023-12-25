import { MdDelete } from "react-icons/md";

interface Props {
  onDelete: (id: string) => void;
  id: string;
}

export default function DeleteButton({ onDelete, id }: Props) {
  return (
    <button onClick={() => onDelete(id)} className="hover:scale-105">
      <MdDelete size={25} />
    </button>
  );
}
