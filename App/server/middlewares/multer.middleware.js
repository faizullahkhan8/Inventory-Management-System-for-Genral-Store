import multer from "multer";

const BACKEND_SERVER_IMAGE_PATH =
    process.env.BACKEND_SERVER_IMAGE_PATH || "assets/images/product-images";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, BACKEND_SERVER_IMAGE_PATH),
    filename: (req, file, cb) => {
        const uniqueName = `${req.body.productName}-${Date.now()}.png`;
        cb(null, uniqueName);
    },
});

export const uploadProductImage = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
});
