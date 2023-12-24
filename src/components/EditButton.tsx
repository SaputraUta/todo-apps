import { AiTwotoneEdit } from "react-icons/ai";

interface Props {
  onEdit?: (id: number) => void;
}

export default function EditButton({ onEdit }: Props) {
  return (
    <button>
      <AiTwotoneEdit size={25} />
    </button>
  );
}
