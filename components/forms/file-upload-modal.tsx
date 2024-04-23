import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import Compressor from "compressorjs";

const FileUpload = () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            fileList.forEach((file) => {
                console.log(
                    `Original File Size: ${file.size / 1024 / 1024} MB`
                );
                new Compressor(file, {
                    quality: 0.8,
                    success(result) {
                        console.log(
                            `Compressed File Size: ${
                                result.size / 1024 / 1024
                            } MB`
                        );
                        setFiles((prevFiles) => [...prevFiles, result as File]);
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });
            });
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
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
                                    />
                                ))}
                            </ScrollArea>
                        )}
                    </div>
                    <Button type="submit">Save</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FileUpload;
