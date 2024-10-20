import { CreateModal, EditModal, DeleteModal } from "@/components/shared/modals";
import useModal from "@/hooks/useModal";
import { ToDo } from "@/interfaces/ToDo";

const ModalManager = () => {
    const { isOpen, onClose, dialogType, data: todo } = useModal();

    if (!isOpen) return null;

    switch (dialogType) {
        case "create":
          return <CreateModal onClose={onClose} />;
        case "edit":
          return <EditModal todo={todo as ToDo} onClose={onClose} />;
        case "delete":
          return <DeleteModal onClose={onClose} />;
        default:
          return null;
      }
}

export default ModalManager