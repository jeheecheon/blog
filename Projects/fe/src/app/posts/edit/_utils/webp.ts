import { blobToWebP } from "webp-converter-browser";

export async function convertToWebPFromFile(
    image: File,
    options: {
        width?: number;
        height?: number;
        quality?: number;
    }
): Promise<File> {
    // File to blob
    const blob = new Blob([image], { type: image.type });

    // Convert to webp
    const webp = await blobToWebP(blob, options);

    // Blob to file
    const webpFile = new File([webp], "image.webp", { type: "image/webp" });

    return webpFile;
}
