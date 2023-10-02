import mongoose from 'mongoose';

const citaSchema = new mongoose.Schema({
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
    dentista: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentista' },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    estado: { type: String, required: true },
});

const CitasModel = mongoose.model('Citas', citaSchema);

export default CitasModel;