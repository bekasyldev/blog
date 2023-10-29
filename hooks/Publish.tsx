import { create } from "zustand";

type publish = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const publish = create<publish>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
