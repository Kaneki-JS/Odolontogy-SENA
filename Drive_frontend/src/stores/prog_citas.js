import { defineStore } from "pinia";
import axios from 'axios';
import { urlBackend } from "../routes/direccion";

export const useProgramarCitasStore = defineStore('programarCitas', () => {
    const getProgramarCita = async () => {
        try {
            let res = await axios.get(`${urlBackend}/citas`);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las citas", error);
            return error
        }
    }

    const postProgramarCita = async (info) => {
        try {
            let res = await axios.post(`${urlBackend}/citas`, info);
            return res
        } catch (error) {
            console.error("Error al programar la cita")
            return error
        }
    }

    return {
        getProgramarCita,
        postProgramarCita
    }
})