import { AiTwotoneEdit } from "react-icons/ai";

interface Props {
  onEdit: (id: string) => void;
  id: string;
}

export default function EditButton({ onEdit, id }: Props) {
  return (
    <button onClick={() => onEdit(id)} className="hover:scale-105">
      <AiTwotoneEdit size={25} />
    </button>
  );
}
