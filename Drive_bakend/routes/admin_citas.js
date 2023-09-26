import express from 'express';
import httpAdminCitas from '../controllers/admin_citas.js';

const router = express.Router();

// Rutas para administración de citas
router.put('/confirmar/:id', httpAdminCitas.confirmarCita);
router.put('/reprogramar/:id', httpAdminCitas.reprogramarCita);
router.delete('/cancelar/:id', httpAdminCitas.cancelarCita);

export default router;
