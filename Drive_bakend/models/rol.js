import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
    codigo:{type:String, require:true},
    denominacion: { type:String, require:true },
    estado: {type:Boolean,require:true},
    createdat : {type: Date, default: Date.now}
},
{collection: 'Rol' });
const Rol = mongoose.model('Rol', rolSchema);
export default Rol;