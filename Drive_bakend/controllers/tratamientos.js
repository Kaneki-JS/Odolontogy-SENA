import TratamientosModel from "../models/tratamientos.js";

    const httpTratamientos = {
        getTratamientos: async (req, res) => {
        try {
            const tratamientos = await TratamientosModel.find({});
            res.json({ tratamientos });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los tratamientos", error });
        }
    },
    
        postTratamiento: async (req, res) => {
            const { paciente, diagnostico, procedimiento, costo, dentista, personal } = req.body;
            const tratamiento = new TratamientosModel({
                paciente,
                diagnostico,
                procedimiento,
                costo,
                dentista,
                personal  // Agregar el campo personal
            });
    
            try {
                const nuevoTratamiento = await tratamiento.save();
                res.json({
                    mensaje: "Un tratamiento insertado!!",
                    nuevoTratamiento
                });
            } catch (error) {
                res.status(500).json({ mensaje: "Error al ingresar el tratamiento", error });
            }
        },
    
        putTratamiento: async (req, res) => {
            const { id } = req.params;
            const { paciente, diagnostico, procedimiento, costo, dentista, personal } = req.body;
            try {
                const tratamientoActualizado = await TratamientosModel.findByIdAndUpdate(
                    id,
                    { paciente, diagnostico, procedimiento, costo, dentista, personal },
                    { new: true }
                );
                res.json({
                    mensaje: "Datos actualizados exitosamente",
                    tratamiento: tratamientoActualizado
                });
            } catch (error) {
                res.status(500).json({ mensaje: "Error al actualizar el tratamiento", error });
            }
        }
    };
    
    export default httpTratamientos;
    