import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create absolute path to temp directory (two levels up from current file)
const tempDir = path.join(__dirname, "..", "..", "public", "temp");

// Ensure the directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    
}



// Define storage settings for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Log the destination path
        
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + '-' + uniqueSuffix + ext;
        
        cb(null, filename);
    },
});

// Add file filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        
        cb(null, true);
    } else {
        
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

// Configure multer with limits
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});