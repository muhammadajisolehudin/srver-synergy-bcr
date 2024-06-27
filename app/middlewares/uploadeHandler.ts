import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR: string = path.join(__dirname, '../../uploads');

// Memastikan direktori uploads ada
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const id = Math.random();
    cb(null, id + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
