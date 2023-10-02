import bcrypt from "bcryptjs";
import axios from "axios";
import jwt from "jsonwebtoken";
import Pacientes from "../models/pacientes.js";
import PersonasClinica from "../models/personal_clinico.js";
import pacientes from "../models/pacientes.js";

const httpLogin = {
  getLogin: async (req, res) => {
    try {
      const personasClinicaData = await PersonasClinica.find();

      if (personasClinicaData) {
        res
          .status(200)
          .json(`usuarios personal clinicico ${personasClinicaData}`);
        console.log("correcto", personasClinicaData);
      } else {
        res.status(404).json({ error: "admins no encontrados f retirate" });
      }
    } catch (error) {
      res.status(400).json({ error: "esto no sirve retirese imbecil" });
      console.log("error", error);
    }
  },
  postLogin: async (req, res) => {
    const { cedula, password } = req.body;

    try {
        let user = null;
        let userType = null;

        // Verificar si el usuario es un PersonasClinica
        user = await PersonasClinica.findOne({ cedula });
        if (user) {
            userType = "PersonasClinica";
            console.log("Inicia PersonasClinica siuxd");
        } else {
            user = await pacientes.findOne({ cedula });
            if (user) {
                userType = "Pacientes";
                console.log("Inicia Pacientes");
            }
        }

        // Si no se encuentra ningún usuario con el cedula proporcionado, retornar error
        if (!user) {
            return res
                .status(401)
                .json({ msg: "Credenciales inválidas usuario no encontrado" });
        }

        // Verificar las credenciales del usuario en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ msg: "Credenciales inválidas" });
        }

        // Registrar la solicitud de inicio de sesión
      res.json({ msg: "Inicio de sesión exitoso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
}}

export default httpLogin;

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
