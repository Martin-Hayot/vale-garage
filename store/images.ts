import { create } from "zustand";

export type ImageState = {
    images: { url: string; order: number }[];
    setImages: (images: string[]) => void;
    setObjects: (images: { url: string; order: number }[]) => void;
};

export const useImages = create<ImageState>((set) => ({
    images: [],
    setImages: (images) => {
        set({ images: images.map((url, index) => ({ url, order: index })) });
    },
    setObjects: (images) => {
        set({ images });
    },
}));
