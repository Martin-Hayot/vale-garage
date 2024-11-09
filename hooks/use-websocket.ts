import { useEffect, useRef } from "react";
import { useWebSocketStore } from "@/store/websocket";

const useWebSocket = (url: string, tab: string) => {
    const setIsConnected = useWebSocketStore((state) => state.setIsConnected);
    const addMessage = useWebSocketStore((state) => state.addMessage);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (tab === "auctions") {
            // Append the token to the WebSocket URL as a query parameter
            const ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onopen = () => {
                ws.send(JSON.stringify({ type: "join" }));
                setIsConnected(true);
            };

            ws.onclose = () => {
                setIsConnected(false);
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                addMessage(data);
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                setIsConnected(false);
            };

            return () => {
                ws.close();
                wsRef.current = null;
            };
        }
    }, [url, tab, setIsConnected, addMessage]);

    const sendMessage = (message: object) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    return { sendMessage };
};

export default useWebSocket;
