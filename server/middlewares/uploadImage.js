import multer from 'multer';
import path from 'path';

export const createImageUpload = (folder) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, `uploads/${folder}`);
    },
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  });

  const fileFilter = (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    cb(new Error('Only image files are allowed'), false);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
};
