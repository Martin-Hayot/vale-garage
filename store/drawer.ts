import { create } from "zustand";

export type DrawerState = {
    isOpen: boolean;
    id: string;
    setIsOpen: (isOpen: boolean) => void;
    setId: (id: string) => void;
    toggleDrawer: (id: string) => void;
};

export const useDrawer = create<DrawerState>((set) => ({
    id: "",
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    setId: (id) => set({ id }),
    toggleDrawer: () =>
        set((state) => ({
            isOpen: !state.isOpen,
        })),
}));
