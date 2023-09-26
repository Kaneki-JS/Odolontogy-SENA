import httpPacientes from "../controllers/pacientes.js";
import {Router} from "express";

const router = Router()

router.get( "/", httpPacientes.getPacientes );

router.post( "/", [
    // aca van los checks
], httpPacientes.postPacientes );

router.put( "/:cedula", httpPacientes.putPaciente )

export default router