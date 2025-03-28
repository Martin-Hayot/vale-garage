"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { FormError } from "../form-error";
import { getSignedURL } from "@/actions/s3";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useImages } from "@/store/images";

const FileUpload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const { images, setImages } = useImages();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        // prevent files that are 2mb or larger
        const filteredFiles = files.filter((file) => file.size <= 1048576);

        if (files.length !== filteredFiles.length) {
            setFileError("Each file must be 1mb or less");
            setFiles([]);
            return;
        }

        setFiles(filteredFiles);
        setFileError(undefined);
    };

    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        let imagesUrl = [];

        if (files.length !== 0) {
            const uploadPromises = files.map(async (file) => {
                try {
                    const checksum = await computeSHA256(file);
                    const signedURLResult = await getSignedURL({
                        fileType: file.type,
                        fileSize: file.size,
                        checksum: checksum,
                    });

                    if (signedURLResult.error !== undefined) {
                        console.error(signedURLResult.error);
                        return null; // Skip this file upload
                    }

                    const { url } = signedURLResult;
                    const res = await axios.put(url, file, {
                        headers: {
                            "Content-Type": file.type,
                        },
                    });

                    if (res.status !== 200) {
                        console.error(res.statusText);
                        toast({
                            variant: "destructive",
                            description:
                                "An error occurred while uploading the file",
                            action: (
                                <ToastAction
                                    onClick={handleSubmit}
                                    altText="Try again"
                                >
                                    Try Again
                                </ToastAction>
                            ),
                            duration: 5000,
                        });
                        return null; // Skip this file upload
                    }

                    return url.split("?")[0]; // Return the image URL without query parameters
                } catch (error) {
                    console.error(
                        "An error occurred during file upload",
                        error
                    );
                    return null; // Skip this file upload on error
                }
            });

            const uploadedImages = await Promise.all(uploadPromises);
            imagesUrl = uploadedImages.filter((url) => url !== null); // Filter out nulls (failed uploads)

            if (imagesUrl.length > 0) {
                const validImagesUrl = imagesUrl.filter(
                    (url): url is string => url !== null
                );
                setImages(validImagesUrl);
                toast({
                    variant: "default",
                    description: "Files uploaded successfully",
                    duration: 5000,
                });
            }
        }

        setFiles([]);
        setIsLoading(false);
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger disabled={isLoading}>
                    <div className="bg-primary text-primary-foreground rounded px-4 py-2">
                        {isLoading && !images ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Upload Images"
                        )}
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload files</DialogTitle>
                        <DialogDescription>
                            Upload files for the offer
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        id="picture"
                        name="picture"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                    <div>
                        {files.length > 0 && (
                            <ScrollArea className="h-64">
                                {files.map((file) => (
                                    <Image
                                        key={file.name}
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        width={100}
                                        height={100}
                                        className="w-full"
                                    />
                                ))}
                            </ScrollArea>
                        )}
                    </div>
                    <FormError message={fileError} />
                    <DialogClose asChild>
                        <Button onClick={handleSubmit}>Upload</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FileUpload;
