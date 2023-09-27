import express from 'express';
import httpLogin from '../controllers/login.js';

const router = express.Router();

// Ruta para iniciar sesión
router.get('/',httpLogin.getLogin);
router.post('/', httpLogin.postLogin);

export default router;
