import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    password: {type: String, require: true, unique: true},
    cedula: {type: Number, require: true, unique: true},
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
    personal_clinico: { type: mongoose.Schema.Types.ObjectId, ref: 'personal_clinico' }
})

export default mongoose.model("Login", loginSchema)
