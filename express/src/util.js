import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export default _dirname;

// Configuración de Multer para subir archivos
/*
const storage = multer.diskStorage({
    // ubicación del directorio donde guardaré los archivos
    destination: function (req, file, cb) {
        cb(null, `${_dirname}/public/img`); // Cambiado __dirname por _dirname
    },

    // el nombre que quiero que tengan los archivos que voy a subir
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploader = multer({
    storage,
    // si se genera algún error, lo capturamos
    onError: function (err, next) {
        console.log(err);
        next();
    }
});*/
