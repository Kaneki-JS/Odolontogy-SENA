import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    cedula: {type: Number, required: false, unique: true},
    // Otros campos del paciente (como apellidos, cédula, etc.)
    fechaAtencion: {type: Date, required: false},  // Campo para almacenar la fecha de atención
    dentista: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentista' },  // Referencia al dentista
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Pacientes' }
});

export default mongoose.model("Paciente", pacienteSchema);
