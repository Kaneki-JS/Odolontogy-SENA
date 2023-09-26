import mongoose from "mongoose";

const   personalSchema = new mongoose.Schema({
    id: {type: String, required: false, unique: true},
    nombre: {type: String, required: false},
    telefono: {type: Number, required: false, unique: true},
    direccion: {type: String, required: false},
    cedula: {type: Number, required: false, unique: true},
    estado: { type: Boolean, default: true } // 1 es activo y 0 es inactivo
})

export default mongoose.model("Personal", personalSchema)
