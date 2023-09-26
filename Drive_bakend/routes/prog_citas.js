import express from 'express';
import httpCitas from '../controllers/prog_citas.js';

const router = express.Router();

// Obtener citas
router.get('/', httpCitas.getCitas);

// Agregar nueva cita
router.post('/', httpCitas.postCitas);

export default router;
