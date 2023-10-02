import { defineStore } from "pinia";
import axios from "axios";
import { urlBackend } from "../routes/direccion";

export const usePacienteStore = defineStore('pacientes', () => {
    const getPacientes = async () => {
        try {
            let res = await axios.get(`${urlBackend}/pacientes`);
            return res.data;
        } catch (error) {
            console.error("Error al obtener los pacientes", error)
            throw error;
        }
    }

    const postPaciente = async (info) => {
        try {
            let res = await axios.post(`${urlBackend}/pacientes`, info);
            return res.data;
        } catch (error) {
            console.error("Error al crear el paciente", error);
            throw error;
        }
    }

    const putPaciente = async (cedula, info) => {
        try {
            let res = await axios.put(`${urlBackend}/pacientes/${cedula}`, info);
            return res.data
        } catch (error) {
            console.error("Error al actualizar el paciente", error);
            throw error;
        }
    }

    const putPacienteEstado = async (id) => {
        try {
            let res = await axios.put(`${urlBackend}/pacientes/estado/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error al actualizar los datos", error)
        }
    }

    return {
        getPacientes,
        postPaciente,
        putPaciente,
        putPacienteEstado
    }
})

