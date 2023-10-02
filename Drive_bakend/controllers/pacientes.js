import PacientesModel from "../models/pacientes.js";
import bcryptjs from 'bcryptjs'

const httpPacientes = {
    getPacientes: async (req, res) => {
        try {
            const pacientes = await PacientesModel.find({});
            res.json({ pacientes });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los pacientes", error });
        }
    },

    postPacientes: async (req, res) => {
        const { nombre, apellidos, cedula, telefono, email, estado, password } = req.body;
        const paciente = new PacientesModel({
            nombre,
            apellidos,
            cedula,
            telefono,
            email,
            estado,
            password
        });
    
        try {
            const salt = bcryptjs.genSaltSync(10);
            paciente.password = bcryptjs.hashSync(password, salt);  // Cambiado login.password a paciente.password
    
            const nuevoPaciente = await paciente.save();
            res.json({
                mensaje: "Un paciente insertado!!",
                nuevoPaciente
            });
        } catch (error) {
            console.error(error); // Imprime el error en la consola
            res.status(500).json({ mensaje: "Error al ingresar el paciente", error });
        }
    },
    

    putPaciente: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellidos, cedula, telefono, email, estado, password } = req.body;
        try {
            const pacienteActualizado = await PacientesModel.findByIdAndUpdate(
                id,
                { nombre, apellidos, cedula, telefono, email, estado, password },
                { new: true }
            );
            res.json({
                mensaje: "Datos actualizados exitosamente",
                paciente: pacienteActualizado
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el paciente", error });
        }
    },

    putPacienteEstado: async (req, res) => {
        try {
            const { id } = req.params  
            const {estado}=req.body
            const pac = await PacientesModel.findById({_id:id})
            console.log(pac);
            if(pac){
            console.log(pac);
            pac.estado=estado
            }

            res.json({
                msj: "fue cambiado el estado",
                pac,
            }) 
        } catch (error) {
            console.log(error);
        }

    }
};



export default httpPacientes;
