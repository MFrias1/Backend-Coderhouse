import express from 'express';

const router = express.Router();

// Ruta principal que renderiza 'index'
router.get('/', (req, res) => {
    res.render('index');
});

// Rutas para otras vistas
router.get("/message", (req, res) => {
    res.render('messages');
});

router.get("/pid", (req, res) => {
    res.render('messages');
});

export default router;
