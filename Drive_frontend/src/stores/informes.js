import { defineStore } from "pinia";
import axios from "axios";
import { urlBackend } from "../routes/direccion.js";

export const useInformesStore = defineStore(
    "informes", () => {
        const informes = ref([]);

        const getInformesPacientesEnIntervalo = async (fechaInicio, fechaFin) => {
            try {
                const response = await axios.get(`${urlBackend}/informes/pacientes/${fechaInicio}/${fechaFin}`);
                informes.value = response.data;
            } catch (error) {
                console.error("Error al obtener informes de pacientes en intervalo", error);
            }
        }

        const getInformesPacientesPorDentista = async (idDentista) => {
            try {
                const response = await axios.get(`${urlBackend}/informes/pacientes/${idDentista}`);
                informes.value = response.data;
            } catch (error) {
                console.error("Error al obtener informes de pacientes por dentista", error);
            }
        }

        return {
            informes,
            getInformesPacientesEnIntervalo,
            getInformesPacientesPorDentista
        }
    }
);
