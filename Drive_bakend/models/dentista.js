import mongoose from 'mongoose';

const dentistaSchema = new mongoose.Schema({
    nombre: { type: String, required: false },
    especialidad: { type: String, required: false },
    experiencia: { type: Number, required: false },
    telefono: { type: Number, required: false },
    cedula: { type: Number, required: false, unique: true },
    direccion: { type: String, required: false },
    estado: { type: Boolean, default: true }
    // password: { type: String, required: false, unique: true }
});

export default mongoose.model('Dentista', dentistaSchema);
