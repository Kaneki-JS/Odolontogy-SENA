import express from 'express';
import httpInformes from '../controllers/informes.js';

const router = express.Router();

// Rutas para generación de informes
router.get('/pacientes/:fechaInicio/:fechaFin', httpInformes.pacientesAtendidosEnIntervalo);
router.get('/pacientes/:idDentista', httpInformes.pacientesAtendidosPorDentista);

export default router;
