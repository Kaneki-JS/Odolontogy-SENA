import httpPersonal from "../controllers/personal_clinico.js";
import { Router } from "express";
import {check} from "express-validator"
import {validarResultados} from "../Middlewares/validaciones.js"

const router = Router()

  router.get("/", httpPersonal.getPersonal)
  
  router.post("/", [
    validarResultados
  ], httpPersonal.postPersonal)
  
  router.put("/:cedula", httpPersonal.putPersonal)
  
  router.put("/estado/:cedula",httpPersonal.putPersonal)
  
  export default router