import { DeleteModal, ToDoFormModal } from "@/components/shared/modals";
import useModal from "@/hooks/useModal";
import { ToDo } from "@/interfaces/ToDo";

const ModalManager = () => {
  const { isOpen, onClose, dialogType, data: todo } = useModal();

  if (!isOpen) return null;

  switch (dialogType) {
    case "create":
      return <ToDoFormModal isEdit={false} onClose={onClose} />;
    case "edit":
      return (
        <ToDoFormModal isEdit={true} todo={todo as ToDo} onClose={onClose} />
      );
    case "delete":
      return <DeleteModal todo={todo as ToDo} onClose={onClose} />;
    default:
      return null;
  }
};

export default ModalManager;
