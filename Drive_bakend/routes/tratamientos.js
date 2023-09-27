// Importar Express y el Controlador
import express from 'express';
import httpTratamientos from '../controllers/tratamientos.js';

const router = express.Router();

// Obtener tratamientos
router.get('/tratamientos', httpTratamientos.getTratamientos);

// Añadir un tratamiento
router.post('/tratamientos', httpTratamientos.postTratamiento);

// Actualizar un tratamiento
router.put('/tratamientos/:id', httpTratamientos.putTratamiento);

export default router;
