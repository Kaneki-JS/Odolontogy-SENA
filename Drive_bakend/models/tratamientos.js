import mongoose from "mongoose";

const tratamientoSchema = new mongoose.Schema({
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
    fechaAtencion: { type: Date, required: true },
    dentista: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentista', required: true },
    personal: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal', required: true }, // Nueva referencia a Personal
});


export default mongoose.model("Tratamiento", tratamientoSchema);
