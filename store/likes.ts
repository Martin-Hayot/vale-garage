import { Like } from "@prisma/client";
import axios from "axios";
import { create } from "zustand";

export type LikeState = {
    likes: Like[];
    addLike: (carBidId: string) => void;
    removeLike: (carBidId: string) => void;
    setLikes: (likes: Like[]) => void;
    getLikes: () => void;
};

export const useLikes = create<LikeState>((set) => ({
    likes: [],
    addLike: async (carBidId) => {
        console.log("carBidId", carBidId);
        const like = await axios.post("/api/offers/likes", {
            carBidId: carBidId,
        });
        set((state) => ({
            likes: [...state.likes, like.data],
        }));
    },
    removeLike: async (carBidId) => {
        const unlike = await axios.delete("/api/offers/likes", {
            data: {
                carBidId: carBidId,
            },
        });
        set((state) => ({
            likes: state.likes.filter((like) => like.id !== unlike.data.id),
        }));
    },
    setLikes: (likes) => set({ likes: likes }),
    getLikes: async () => {
        const likes = await axios.get("/api/offers/likes");

        set({ likes: likes.data });
    },
}));
