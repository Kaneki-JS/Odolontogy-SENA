import { defineStore } from 'pinia';
import axios from 'axios';
import { urlBackend } from '../routes/direccion.js';

export const useAdminCitasStore = defineStore('adminCitas', () => {
    const confirmarCita = async (id) => {
        try {
            let res = await axios.put(`${urlBackend}/admin/confirmar/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error al confirmar la cita", error);
            return error;
        }
    }

    const reprogramarCita = async (id) => {
        try {
            let res = await axios.put(`${urlBackend}/admin/reprogramar/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error al reprogramar la cita", error);
            return error;
        }
    }

    const cancelarCita = async (id) => {
        try {
            let res = await axios.delete(`${urlBackend}/admin/cancelar/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error al cancelar la cita", error);
            return error;
        }
    }

    return {
        confirmarCita,
        reprogramarCita,
        cancelarCita
    }
});
