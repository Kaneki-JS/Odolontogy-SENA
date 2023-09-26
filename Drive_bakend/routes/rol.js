import httpRol from "../controllers/rol.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarResultados } from "../Middlewares/validaciones.js";

const router = Router()

router.get("/", httpRol.getRolesUsuarios)

router.get("/:id", httpRol.getRolesUsuariosId)

router.post("/", [
  check("denominacion", "La denominacion es un campo requerido").notEmpty().trim().isString(),
  validarResultados
], httpRol.postRolesUsuarios)

router.put("/:id", httpRol.putRolUsuarios)

export default router