import { defineStore } from "pinia";
import axios from 'axios';
import { urlBackend } from "../routes/direccion";

export const useDentistaStore = defineStore('dentista', () => {
    const getDentistas = async () => {
        try {
            let res = await axios.get(`${urlBackend}/dentista`);
            return res.data;
        } catch (error) {
            console.error("Error al obtener los dentistas", error);
            throw error; // Agrega un throw para propagar el error
        }
    }

    const postDentista = async (info) => {
        try {
            let res = await axios.post(`${urlBackend}/dentista`, info);
            return res.data;
        } catch (error) {
            console.error("Error al crear un dentista", error);
            throw error; // Agrega un throw para propagar el error
        }
    }

    const putDentista = async (cedula, info) => {
        try {
            let res = await axios.put(`${urlBackend}/dentista/${cedula}`, info);
            return res.data;
        } catch (error) {
            console.error("Error al actualizar el dentista", error);
            throw error; // Agrega un throw para propagar el error
        }
    }

    const putDentistaEstado = async (id, estado) => {
        try {
            let res = await axios.put(`${urlBackend}/dentista/estado/${id}`,{
                estado:estado
            });
            return res.data;
        } catch (error) {
            console.error("Error al actualizar los datos", error);
        }
    }

    return {
        getDentistas,
        postDentista,
        putDentista,
        putDentistaEstado
    }
})
