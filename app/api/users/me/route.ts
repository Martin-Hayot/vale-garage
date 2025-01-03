import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function DELETE() {
    const user = await currentUser();

    if (!user) {
        return NextResponse.redirect("/login");
    }

    try {
        await db.user.delete({
            where: {
                id: user.id,
            },
        });
    } catch (e) {
        return new NextResponse("Failed to delete user", { status: 500 });
    }

    return NextResponse.json({ message: "User deleted" });
}
