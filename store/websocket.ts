import { create } from "zustand";

interface WebSocketState {
    isConnected: boolean;
    messages: any[];
    setIsConnected: (isConnected: boolean) => void;
    addMessage: (message: any) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
    isConnected: false,
    messages: [],
    setIsConnected: (isConnected) => set({ isConnected }),
    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
}));
