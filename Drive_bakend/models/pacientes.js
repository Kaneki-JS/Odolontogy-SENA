import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    nombre: { type: String, required: false },
    apellidos: { type: String, required: false },
    cedula: { type: Number, required: false, unique: true },
    telefono: { type: Number, required: false, unique: true },
    estado: { type: Boolean, default: true },
    password: { type: String, required: false, unique: true }
})

export default mongoose.model("Pacientes", pacienteSchema)