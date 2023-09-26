import express from 'express';
import httpUsuario from '../controllers/usuarios.js';

const router = express.Router();

// Middleware para verificar si es personal clínico
router.use('/postUsuario', httpUsuario.personalCLinico);

// Rutas para usuarios
router.post('/postUsuario', httpUsuario.postUsuario);
router.post('/postUsuarioPaciente/:cedula', httpUsuario.postUsuarioPaciente);

export default router;
