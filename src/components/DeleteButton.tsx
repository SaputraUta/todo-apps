import { MdDelete } from "react-icons/md";

interface Props {
  onDelete?: (id: number) => void;
}

export default function DeleteButton({ onDelete }: Props) {
  return (
    <button>
      <MdDelete size={25} />
    </button>
  );
}
