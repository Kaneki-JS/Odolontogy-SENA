import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    nombre: {type: String, required: false},
    apellidos: {type: String, required: false},
    cedula: {type: Number, required: false, unique: true},
    // Otros campos del paciente (como apellidos, cédula, etc.)
    fechaAtencion: Date,  // Campo para almacenar la fecha de atención
    dentista: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentista' }  // Referencia al dentista
});

export default mongoose.model("Paciente", pacienteSchema);
