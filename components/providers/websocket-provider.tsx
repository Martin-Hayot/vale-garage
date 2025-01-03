import React, { createContext, useContext } from "react";
import useWebSocket from "@/hooks/use-websocket";

const WebSocketContext = createContext<ReturnType<typeof useWebSocket> | null>(
    null
);

export const WebSocketProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const ws = useWebSocket(
        `ws://${
            process.env.NODE_ENV === "production"
                ? "api.example.com"
                : "localhost:8080"
        }/ws/auction`
    );

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    return useContext(WebSocketContext);
};
