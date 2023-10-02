import httpDentista from "../controllers/dentista.js";
import { Router } from "express";

const router = Router()

router.get("/", httpDentista.getDentistas);

router.post("/", httpDentista.postDentista);

router.put("/:cedula", httpDentista.putDentista);

router.put("/estado/:id", httpDentista.putDentistaEstado);

export default router