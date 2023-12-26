import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface Props {
  onDelete: (id: string) => void;
  id: string;
}

export default function DeleteButton({ onDelete, id }: Props) {
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && deleteModal) {
        setDeleteModal(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [deleteModal]);

  return (
    <>
      {deleteModal && (
        <div className="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="w-3/4 md:w-1/2 h-1/4 rounded-lg bg-slate-200 relative">
            <button
              onClick={() => setDeleteModal(false)}
              className="hover:scale-105 absolute top-1 left-[88%] sm:left-[90%]"
            >
              <IoClose size={25} />
            </button>
            <div className="p-10">
              <p className="text-center pb-5 font-medium tracking-wider text-sm sm:text-base md:text-lg lg:text-xl text-slate-900">
                Are you sure want to delete this todo?
              </p>
              <div className="self-center left-[43%] sm:left-1/2 flex justify-center items-center gap-5">
                <button
                  onClick={() => {
                    setDeleteModal(false);
                    onDelete(id);
                  }}
                  className="bg-slate-900 text-slate-100 py-2 px-10 sm:px-14 lg:px-16 rounded-lg text-sm sm:text-base font-medium"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteModal(false)}
                  className="text-slate-900 bg-slate-100 border-2 border-slate-900 py-2 px-10 sm:px-14 lg:px-16 rounded-lg text-sm sm:text-base font-medium"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setDeleteModal(true)} className="hover:scale-105">
        <MdDelete size={25} />
      </button>
    </>
  );
}
