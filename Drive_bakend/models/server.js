import express from "express"
import mongoose from "mongoose"


import dentista from "../routes/dentistas.js";
import informes from "../routes/informes.js";
import login from "../routes/login.js";
import pacientes from "../routes/pacientes.js";
import personal from "../routes/personal_clinico.js";
import progCitas from "../routes/prog_citas.js";
import rol from "../routes/rol.js";
import tratamientos from "../routes/tratamientos.js";
import usuarios from "../routes/usuarios.js";




import cors from "cors"
class Server {   
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    routes() { 
        this.app.use('/dentista', dentista)
        this.app.use('/informes', informes)
        this.app.use('/login', login);
        this.app.use("/pacientes", pacientes);
        this.app.use('/personal', personal);
        this.app.use('/citas', progCitas);
        this.app.use('/rol', rol);
        this.app.use('/tratamientos', tratamientos)
        this.app.use('/usuarios',usuarios );
        
        
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