import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const personalSchema = new mongoose.Schema(
  {
    id: { type: String, required: false, unique: true },
    nombre: { type: String, required: false },
    telefono: { type: Number, required: false, unique: true },
    direccion: { type: String, required: false },
    cedula: { type: Number, required: false, unique: true },
    estado: { type: Boolean, default: true }, // 1 es activo y 0 es inactivo
    password: { type: String, required: false, unique: true },
  },
  {
    collection: "PersonasClinica",
  }
);

personalSchema.pre('save',async function(next){
    if (this.isModified('password')){
        const salt =await bcrypt.genSalt(10);
        this.password =await bcrypt.hash(this.password, salt)
    }
    next()
});

export default mongoose.model("Personal", personalSchema);
