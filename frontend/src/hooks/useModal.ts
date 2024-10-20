
import { ToDo } from "@/interfaces/ToDo";
import { create } from "zustand";

interface ModalProps {
    isOpen: boolean;
    onOpen: (type: 'create' | 'edit' | 'delete') => void;
    onClose: () => void;
    dialogType: 'create' | 'edit' | 'delete' | null;
    data: ToDo | null;
    setData: (data: ToDo) => void;
  }
  
const useModal = create<ModalProps>((set) => ({
    isOpen: false,
    dialogType: null,
    onOpen: (type) => set({ isOpen: true, dialogType: type }),
    onClose: () => set({ isOpen: false, dialogType: null, data: null }),
    data: null,
    setData: (data : ToDo ) => set({ data }),
  }));
  
  export default useModal;