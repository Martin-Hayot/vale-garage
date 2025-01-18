"use server";

import { currentUser } from "@/lib/auth";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import crypto from "crypto";

const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.S3_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/jpg",
];

const allowedModelTypes = [
    "model/gltf+json",
    "model/gltf-binary",
    "model/obj",
    "model/stl",
];

type GetSignedURLParams = {
    fileType: string;
    fileSize: number;
    checksum: string;
};

const maxImageFileSize = 1048576; // 1 MB
const maxModelFileSize = 5242880; // 5 MB

export async function getSignedURL({
    fileType,
    fileSize,
    checksum,
}: GetSignedURLParams) {
    const user = await currentUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    if (![...allowedImageTypes, ...allowedModelTypes].includes(fileType)) {
        return { error: "File type not allowed" };
    }

    if (
        (allowedImageTypes.includes(fileType) && fileSize > maxImageFileSize) ||
        (allowedModelTypes.includes(fileType) && fileSize > maxModelFileSize)
    ) {
        return { error: "File size too large" };
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: generateFileName(),
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60,
    });

    return { url: signedUrl };
}
