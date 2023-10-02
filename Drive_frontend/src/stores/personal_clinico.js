import { defineStore } from 'pinia';
import axios from 'axios';
import { urlBackend } from '../routes/direccion.js';

export const usePersonalStore = defineStore('personalClinico', () => {
    const getPersonal = async () => {
        try {
            let res = await axios.get(`${urlBackend}/personal`);
            return res.data;
        } catch (error) {
            console.error("Error al obtener el personal clínico", error);
            return error;
        }
    }

    const postPersonal = async (info) => {
        try {
            let res = await axios.post(`${urlBackend}/personal`, info);
            return res.data;
        } catch (error) {
            console.error("Error al crear un miembro del personal clínico", error);
            return error;
        }
    }

    const putPersonal = async (cedula, info) => {
        try {
            let res = await axios.put(`${urlBackend}/personal/${cedula}`, info);
            return res.data;
        } catch (error) {
            console.error("Error al actualizar un miembro del personal clínico", error);
            return error;
        }
    }

    const putPersonalEstado = async (id) =>{
        try {
            let res = await axios.put(`${urlBackend}/personal/estado/${id}`,);
            return res.data;
        } catch (error) {
            console.error("Error al actualizar los datos", error);
        }
    }

    // const putDentistaEstado = async (id, estado) => {
    //     try {
    //         let res = await axios.put(`${urlBackend}/dentista/estado/${id}`,{
    //             estado:estado
    //         });
    //         return res.data;
    //     } catch (error) {
    //         console.error("Error al actualizar los datos", error);
    //     }
    // }

    return {
        getPersonal,
        postPersonal,
        putPersonal,
        putPersonalEstado
    }
});
