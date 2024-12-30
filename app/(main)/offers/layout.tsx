"use client";

import { WebSocketProvider } from "@/components/providers/websocket-provider";
import { ReactNode } from "react";

const OffersLayout = ({ children }: { children: ReactNode }) => {
    return <WebSocketProvider>{children}</WebSocketProvider>;
};

export default OffersLayout;
