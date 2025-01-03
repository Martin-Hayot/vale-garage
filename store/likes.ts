import { SaleLike, AuctionLike } from "@prisma/client";
import axios from "axios";
import { create } from "zustand";

export type SaleLikeState = {
    saleLikes: SaleLike[];
    addSaleLike: (saleId: string) => void;
    removeSaleLike: (saleId: string) => void;
    setSaleLikes: (likes: SaleLike[]) => void;
    getSaleLikes: () => void;
};

export type AuctionLikeState = {
    auctionLikes: AuctionLike[];
    addAuctionLike: (auctionId: string) => void;
    removeAuctionLike: (auctionId: string) => void;
    setAuctionLikes: (likes: AuctionLike[]) => void;
    getAuctionLikes: () => void;
};

export const useSaleLikes = create<SaleLikeState>((set) => ({
    saleLikes: [],
    addSaleLike: async (saleId) => {
        console.log("saleId", saleId);
        const like = await axios.post("/api/sales/likes", {
            saleId: saleId,
        });
        set((state) => ({
            saleLikes: [...state.saleLikes, like.data],
        }));
    },
    removeSaleLike: async (saleId) => {
        const unlike = await axios.delete("/api/sales/likes", {
            data: {
                saleId: saleId,
            },
        });
        set((state) => ({
            saleLikes: state.saleLikes.filter(
                (like) => like.id !== unlike.data.id
            ),
        }));
    },
    setSaleLikes: (likes) => set({ saleLikes: likes }),
    getSaleLikes: async () => {
        const likes = await axios.get("/api/sales/likes");

        set({ saleLikes: likes.data });
    },
}));

export const useAuctionLikes = create<AuctionLikeState>((set) => ({
    auctionLikes: [],
    addAuctionLike: async (auctionId) => {
        console.log("auctionId", auctionId);
        const like = await axios.post("/api/auctions/likes", {
            auctionId: auctionId,
        });
        set((state) => ({
            auctionLikes: [...state.auctionLikes, like.data],
        }));
    },
    removeAuctionLike: async (auctionId) => {
        const unlike = await axios.delete("/api/auctions/likes", {
            data: {
                auctionId: auctionId,
            },
        });
        set((state) => ({
            auctionLikes: state.auctionLikes.filter(
                (like) => like.id !== unlike.data.id
            ),
        }));
    },
    setAuctionLikes: (likes) => set({ auctionLikes: likes }),
    getAuctionLikes: async () => {
        const likes = await axios.get("/api/auctions/likes");

        set({ auctionLikes: likes.data });
    },
}));
