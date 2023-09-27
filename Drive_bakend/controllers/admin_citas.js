import CitasModel from "../models/admin_citas.js";

const httpAdminCitas = {
    confirmarCita: async (req, res) => {
        const { id } = req.params;
        try {
            const citaConfirmada = await CitasModel.findByIdAndUpdate(
                id,
                { confirmada: true },
                { new: true }
            );
            res.json({
                mensaje: "Cita confirmada",
                cita: citaConfirmada
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al confirmar la cita", error });
        }
    },

    reprogramarCita: async (req, res) => {
        const { id } = req.params;
        const { fecha, hora } = req.body;
        try {
            const citaReprogramada = await CitasModel.findByIdAndUpdate(
                id,
                { fecha, hora },
                { new: true }
            );
            res.json({
                mensaje: "Cita reprogramada",
                cita: citaReprogramada
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al reprogramar la cita", error });
        }
    },

    cancelarCita: async (req, res) => {
        const { id } = req.params;
        try {
            await CitasModel.findByIdAndDelete(id);
            res.json({
                mensaje: "Cita cancelada"
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al cancelar la cita", error });
        }
    }
};

export default httpAdminCitas;
