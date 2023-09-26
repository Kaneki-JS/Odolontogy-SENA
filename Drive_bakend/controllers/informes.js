import PacientesModel from "../models/pacientes.js";
// import TratamientosModel from "../models/tratamientos.js";

const httpInformes = {
    pacientesAtendidosEnIntervalo: async (req, res) => {
        const { fechaInicio, fechaFin } = req.params;
        try {
            const pacientes = await PacientesModel.find({
                fechaAtencion: { $gte: fechaInicio, $lte: fechaFin }
            });
            res.json({ pacientes });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al generar el informe", error });
        }
    },

    pacientesAtendidosPorDentista: async (req, res) => {
        const { idDentista } = req.params;
        try {
            const pacientes = await PacientesModel.find({ dentista: idDentista });
            res.json({ pacientes });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al generar el informe", error });
        }
    }
};

export default httpInformes;
