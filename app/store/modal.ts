import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import create from "zustand";

type ModalProps = {
  modalRef: React.RefObject<BottomSheetMethods> | null;
  setModalRef: (ref: any) => void;
};

const useModalStore = create<ModalProps>((set) => ({
  modalRef: null,
  setModalRef: (ref: React.RefObject<BottomSheetMethods>) =>
    set({ modalRef: ref }),
}));

export default useModalStore;
