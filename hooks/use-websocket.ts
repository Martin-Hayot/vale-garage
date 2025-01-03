import { useEffect, useRef, useCallback } from "react";
import { useWebSocketStore } from "@/store/websocket";

const useWebSocket = (url: string) => {
    const { setIsConnected, addMessage } = useWebSocketStore();
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

    const connect = useCallback(() => {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "join" }));
            setIsConnected(true);
            console.log("WebSocket connected.");
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current);
                reconnectInterval.current = null;
            }
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log("WebSocket disconnected, attempting to reconnect...");
            if (!reconnectInterval.current) {
                reconnectInterval.current = setInterval(() => {
                    connect();
                }, 5000); // Attempt to reconnect every 5 seconds
            }
        };

        ws.onmessage = (event) => {
            try {
                // parse JSON recursively
                const data = JSON.parse(event.data, (key, value) => {
                    if (typeof value === "string" && value.startsWith("{")) {
                        return JSON.parse(value);
                    }
                    return value;
                });
                console.log(data);
                addMessage(data);
            } catch (error) {
                console.log("Failed to parse WebSocket message:", error);
            }
        };

        ws.onerror = (error) => {
            console.log("WebSocket error:", error);
            setIsConnected(false);
            ws.close();
        };
    }, [url, setIsConnected, addMessage]);

    useEffect(() => {
        connect();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current);
            }
        };
    }, [connect]);

    const sendMessage = (message: object) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        } else {
            console.log("WebSocket is not connected.");
        }
    };

    return { sendMessage };
};

export default useWebSocket;
