import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import PersonalClinico from '../models/personal_clinico.js';
//import PersonalRutas from '../models/personalRutas.js';
import Pacientes from '../models/pacientes.js';
import personal_clinico from '../models/personal_clinico.js';

const httpLogin = {
    iniciarSesion: async (req, res) => {
        const { cedula, password } = req.body;
    
    // console.log(cedula,password);
        try {
            let user = null;
            let userType = null;
        // Verificar si el usuario es un Personal
            user = await personalRutas.findOne({ cedula });
        if (user) {
            userType = 'personal_clinico';
        //   console.log("Inicia personal_clinico");
        } else {
          // Verificar si el usuario es un personal_clinico de Rutas
            user = await personalRutas.findOne({ cedula });
            if (user) {
            userType = 'personalRutas';
            console.log("Inicia personal_clinico de Rutas");
        } else {
            // Verificar si el usuario es un Pacientes
                user = await Pacientes.findOne({ cedula });
            if (user) {
                userType = 'Pacientes';
                console.log("Inicia Pacientes");
            }
        }
        }
        // Si no se encuentra ningún usuario con el cedula proporcionado, retornar error
        if (!user) {
            return res.status(401).json({ msg: 'Credenciales inválidas usuario no encontrado' });
        }
        // Verificar las credenciales del usuario en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Credenciales inválidas revisa la contraseña' });
        }
        // Si las credenciales son válidas, generar el token JWT usando la clave privada del archivo .env
        const token = jwt.sign(
            { userId: user._id, userType: userType },
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: '1h' }
        );
            res.json({ msg: 'Inicio de sesión exitoso.', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    }
}

export default httpLogin






// import LoginModel from "../models/login.js"

// const httpLogin = {
//     getLogins: async ( req, res ) => {
//         try {
//             const logins = await LoginModel.find({}) 
//             res.json({ logins })
//         } catch (error) {
//             res.status(500).json({ mensaje: "Error al obtener los ", error })
//         }
//     },

//     postLogin: async ( req, res ) => {
//         const { password, cedula, paciente, administrativo, doctor } = req.body;
//         const login = new LoginModel({
//             password,
//             cedula,
//             administrativo,
//             paciente,
//             doctor
//         });

//         try {
//             const nuevoLogin = await login.save();
//             res.json({
//                 mensaje: "Un login insertado!!",
//                 nuevoLogin
//             })
//         } catch (error) {
//             res.status(500).json({ mensaje: "Error al insertar el login", error })
//         }
//     },

//     putLogin: async ( req, res ) => {
//         const { cedula } = req.params;
//         const { password, usuario, paciente, administrativo, doctor } = req.body;
//         const login = await LoginModel.findByIdAndUpdate( cedula, { password, usuario, paciente, administrativo, doctor }, { new: true } )
//         res.json({
//             mensaje: "Datos actualizados exitosamente",
//             login
//         })
//     }
// }

// export default httpLogin
