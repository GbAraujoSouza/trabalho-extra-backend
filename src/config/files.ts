import multer from 'multer';
import path from 'path';

//Configuração de storage
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    let dest;
    if (file.mimetype.startsWith('text/')) {
      dest = path.join(__dirname, '..', '..', 'uploads', 'texts');
    } else {
      dest = path.join(__dirname, '..', '..', 'uploads', 'photos');
    }
    callback(null, dest);
  },
  filename: function (request, file, callback) {
    const { id } = request.params;
    callback(null, file.originalname);
  },
});

//upload de arquivos txt
const textUpload = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024,
    files: 1,
  },
  fileFilter: function (request, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.txt') {
      return callback(
        new Error('Apenas arquivos de texto .txt são permitidos'),
      );
    }
    callback(null, true);
  },
});

// upload de imagens
const photoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
    files: 1,
  },
  fileFilter: function (req, file, callback) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error('Apenas arquivos .jpg, .jpeg e .png são suportados'),
      );
    }
    callback(null, true);
  },
});

export { textUpload, photoUpload };
