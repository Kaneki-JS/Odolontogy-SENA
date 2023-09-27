import CitasModel from "../models/prog_citas.js"

    const httpCitas = {
        getCitas: async (req, res) => {
            try {
                const citas = await CitasModel.find({})
                res.json({ citas })
            } catch (error) {
                res.status(500).json({ mensaje: "Error al obtener las citas", error })
            }
        },
    
        postCitas: async (req, res) => {
            const { paciente, dentista, fecha, hora, estado, personal } = req.body;
            const cita = new CitasModel({
                paciente,
                dentista,
                fecha,
                hora,
                estado,
                personal  // Agregar el campo personal
            });
    
            try {
                const nuevaCita = await cita.save();
                res.json({
                    mensaje: "Una cita insertada!!",
                    nuevaCita
                })
            } catch (error) {
                res.status(500).json({ mensaje: "Error al ingresar la cita", error })
            }
        },
    };
    
    export default httpCitas;
    