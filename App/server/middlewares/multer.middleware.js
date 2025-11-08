import multer from "multer";

const uploadPath = "assets/images/product-images";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
        const uniqueName = `${req.body.productName}-${Date.now()}.png`;
        cb(null, uniqueName);
    },
});

export const uploadProductImage = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
});
