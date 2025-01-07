"use client";

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
        process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws/auction"
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
