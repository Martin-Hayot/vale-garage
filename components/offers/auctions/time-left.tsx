"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeftProps {
    auction: any;
}

const TimeLeft = ({ auction }: TimeLeftProps) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    useEffect(() => {
        const endDate = new Date(auction.endDate); // Parse the date as is
        const endTime = endDate.getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance <= 0) {
                setHasEnded(true);
                setTimeLeft(0);
                setLoading(false);
                clearInterval(interval);
            } else {
                setTimeLeft(distance);
                setLoading(false);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [auction.endDate]);

    const formatTimeLeft = (time: number) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <motion.div className="mt-2">
            {loading ? (
                <motion.div exit={{ opacity: 0 }}>
                    <Loader2 size={24} className="animate-spin" />
                </motion.div>
            ) : hasEnded ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg text-red-500"
                >
                    Auction has ended
                </motion.p>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg"
                >
                    Time Left:{" "}
                    <span className="text-red-500">
                        {formatTimeLeft(timeLeft!)}
                    </span>
                </motion.p>
            )}
        </motion.div>
    );
};

export default TimeLeft;
