import express from 'express';
import httpLogin from '../controllers/login.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/iniciar-sesion', httpLogin.iniciarSesion);

export default router;
