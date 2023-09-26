import Usuario from "../models/usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Rol from "../models/rol.js"
import dotenv from "dotenv";

const httpUsuario = {
personalCLinico: async (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
        return res.status(403).json({ msg: 'Acceso no autorizado' });
    }else{
        const token = authHeader.split(' ')[1];
        try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const usuario = decoded;
        const buscarRol= await Rol.findOne({_id:usuario.rol})
        if (usuario && buscarRol.denominacion === 'PersonalClinico') {
        next();
    } else {
            res.status(403).json({ msg: 'Acceso no autorizado' });
    }
        } catch (error) {
            res.status(403).json({ msg: 'Acceso no autorizado' });
        }
        }
    },
    
postUsuario: async (req, res) => {
        try {
            const nuevoPersonal = new Usuario(req.body);
            const buscar = await Usuario.findOne({ codigo: nuevoPersonal.codigo });
            if (buscar) {
                return res.status(400).json({ msg: `Se encontro un Usuario registrado con ese codigo` });
            } else {
                const salt = bcrypt.genSaltSync()
    
        nuevoPersonal.password = bcrypt.hashSync(req.body.password, salt)
            const PersonalCreado = await nuevoPersonal.save();
            res.status(201).json(PersonalCreado);
            }
    
        } catch (error) {
            res.status(500).json({ error: 'No se pudo crear el Personal.' });
        }
    },
    
postUsuarioPaciente: async (req, res) => {
        const { cedula } = req.params;
        const { paciente } = req.body;
        try {
            const pacienteAgregado = await Usuario.updateOne(
            { _cedula: cedula },
            { $addToSet: { paciente: paciente } }
        );
        if (pacienteAgregado.modifiedCount !== 0) {
            return res.json({pacienteAgregado,msj:"Paciente agregado correctamente ✅"});
        }else{
            return res.status(400).json({ msg: `El paciente ya está ligado a esta agregado ${paciente}` });
        }
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Hubo un error en el servidor', error });
        }
    }
};

export default httpUsuario






// import UsuariosModel from "../models/Usuarios.js"
// import bcrypt from "bcrypt"

// const httpUsuarios = { 
//     getUsuarios: async (req, res) => {
//         try {
//             const Usuarios = await UsuariosModel.find();
//             res.status(200).json({ Usuarios });
//         } catch ( error ) {
//             res.status(500).json({ mensaje: "Error al obtener los Usuarios", error })
//         }
//     },

//     postUsuarios: async ( req, res ) => {
//         const {nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, estado, idRolUsuario, idRedConocimiento} = req.body;
//         try {
//             const hashedPassword = await bcrypt.hash(password, 10); 
//             const usuario = new UsuariosModel({
//                 nombre, 
//                 apellidos,
//                 cedula,
//                 telefono,
//                 email,
//                 password:hashedPassword,
//                 estado,
//             });
//             await usuario.save();
//             res.json({
//                 mensaje: "Un usuario insertado!!",
//                 usuario
//             });
//         } catch (error) {
//             res.status(500).json({ mensaje: "Error al insertar al instructor", error });
//         } 
//     },

//     putUsuarios: async (req, res) => {
//         const { id } = req.params;
//         const { nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, idRolUsuario, idRedConocimiento} = req.body;
//         const usuario = await UsuariosModel.findByIdAndUpdate(id, {nombre, apellidos, cedula, telefono, email, password, perfilProfesional, curriculum, idRolUsuario, idRedConocimiento}, { new: true })
//         res.json({
//             msg: "ok",
//             usuario
//         })
//     },

//     putUsuariosEstado: async (req, res) => {
//             const { id } = req.params  
//             const usu = await UsuariosModel.findById(id)
//             let usuario = null
//             if (usu.estado) {
//                 usuario = await UsuariosModel.findByIdAndUpdate(id, { estado: false })
//             } else {
//                 usuario = await UsuariosModel.findByIdAndUpdate(id, { estado: true })
//             }
//             const usuarioAutenticado = req.usuario
//             res.json({
//                 msj: "fue cambiado el estado",
//                 usuario,
//                 usuarioAutenticado
//             }) 
//         },
// }

// export default httpUsuarios