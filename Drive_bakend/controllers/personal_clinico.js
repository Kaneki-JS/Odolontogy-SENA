import PersonalModel from "../models/personal_clinico.js"
import bcryptjs from "bcryptjs"


const httpPersonal = {
    getPersonal: async (req, res) => {
        try {
            const ProgramasFormacion = await PersonalModel.find({});
            res.json({ ProgramasFormacion });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener las formaciones", error })
        }
    },

    postPersonal: async ( req, res ) => {
        const { nombre, direccion, cedula, estado, telefono } = req.body;
        const ProgramasFormacion = new PersonalModel({
            nombre,
            direccion,
            cedula,
            estado, 
            telefono
        });

        try {
            const nuevaProgramasFormacion = await ProgramasFormacion.save();

            res.json({
                mensaje: "Un personal insertada!!",
                nuevaProgramasFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar la formacion", error });
        }
    },

    putPersonal: async (req, res) => {
        const { cedula } = req.params; // Obtener cedula de los parámetros de la URL
        const { nombre, direccion, estado, telefono } = req.body;
        
        try {
            // Buscar y actualizar el registro por cedula
            const personal = await PersonalModel.findOneAndUpdate(
                { cedula }, 
                { nombre, direccion, telefono, estado }, 
                { new: true }
            );
            
            if (!personal) {
                return res.status(400).json({ mensaje: "Personal no encontrado" });
            }
    
            res.json({
                mensaje: "Datos actualizados exitosamente",
                personal
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: "Error al actualizar la formación", error });
        }
    },
    
    

    putPersonalEstado: async ( req, res ) => {
        const { cedula } = req.params;

        try {
            
            const ProgramasFormacion = await PersonalModel.findOne({cedula});

            if ( !ProgramasFormacion ) {
                return res.status(400).json({ mensaje: "Formacion no encontrada" });
            }

            ProgramasFormacion.estado = !ProgramasFormacion.estado

            await ProgramasFormacion.save();

            const estadoMensaje = ProgramasFormacion.estado ? "Activo" : "Inactivo";

            res.json({
                mensaje: `Estado de la formacion modificada a  ${ estadoMensaje }`,
                ProgramasFormacion
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error l cambiar el estado de la formacion", error })
        }
    }
}

export default httpPersonal