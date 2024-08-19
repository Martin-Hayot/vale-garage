import { db } from "@/lib/db";

export const getUserLikes = async (userId: string) => {
    try {
        const likes = await db.like.findMany({
            where: {
                userId,
            },
        });

        return likes;
    } catch (error) {
        return [];
    }
};
