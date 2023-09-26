import express from "express"
import mongoose from "mongoose"

import personal from "../routes/personal_clinico.js";
import login from "../routes/login.js";
import usuarios from "../routes/Usuarios.js";
import pacientes from "../routes/pacientes.js";
import rol from "../routes/rol.js"



import cors from "cors"
class Server {   
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    routes() { 
        this.app.use('/personal', personal);
        this.app.use('/login', login) ;
        this.app.use('/usuarios',usuarios );
        this.app.use("/pacientes", pacientes);
        this.app.use('/rol', rol)
    }

    conectarDB() {
        mongoose.connect(process.env.MONGODB)
        .then(() => console.log('Ya esta conectado'));
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('public'))
    }
    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
    
}

export default Server