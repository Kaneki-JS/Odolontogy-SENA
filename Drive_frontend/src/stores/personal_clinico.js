import { defineStore } from 'pinia';
import axios from 'axios';
import { urlBackend } from '../routes/direccion.js';

export const usePersonalClinicoStore = defineStore('personalClinico', () => {
    const getPersonalClinico = async () => {
        try {
            let res = await axios.get(`${urlBackend}/personal`);
            return res.data;
        } catch (error) {
            console.error("Error al obtener el personal clínico", error);
            return error;
        }
    }

    const postPersonalClinico = async (info) => {
        try {
            let res = await axios.post(`${urlBackend}/personal`, info);
            return res.data;
        } catch (error) {
            console.error("Error al crear un miembro del personal clínico", error);
            return error;
        }
    }

    const putPersonalClinico = async (cedula, info) => {
        try {
            let res = await axios.put(`${urlBackend}/personal/${cedula}`, info);
            return res.data;
        } catch (error) {
            console.error("Error al actualizar un miembro del personal clínico", error);
            return error;
        }
    }

    const cambiarEstadoPersonalClinico = async (cedula) => {
        try {
            let res = await axios.put(`${urlBackend}/personal/estado/${cedula}`);
            return res.data;
        } catch (error) {
            console.error("Error al cambiar el estado de un miembro del personal clínico", error);
            return error;
        }
    }

    return {
        getPersonalClinico,
        postPersonalClinico,
        putPersonalClinico,
        cambiarEstadoPersonalClinico
    }
});
