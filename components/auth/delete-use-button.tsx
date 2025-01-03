"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const DeleteUserButton = ({ children }: { children: React.ReactNode }) => {
    const { update } = useSession();
    const router = useRouter();
    const handleClick = async () => {
        const response = await axios.delete(`/api/users/me`);

        if (response.status === 200) {
            update();
            router.push("/");
            return;
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>{children}</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure ?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to
                        permanently delete your account ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-between flex-row w-full">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>

                    <Button variant={"destructive"} onClick={handleClick}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteUserButton;
