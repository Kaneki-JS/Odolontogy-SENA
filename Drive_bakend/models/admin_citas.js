import mongoose from 'mongoose';

const citaSchema = new mongoose.Schema({
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
    dentista: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentista' },
    fecha: Date,
    hora: String,
    estado: { type: String, enum: ['programada', 'confirmada', 'cancelada', 'completada'] },
    observaciones: String,
    motivo: String,
    tipoTratamiento: String,
    duracionEstimada: Number, // En minutos
});

export default mongoose.model("Cita", citaSchema);
