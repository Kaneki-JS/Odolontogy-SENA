import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: { type:String, require:true, default: " "},
    apellidos: { type:String, require:true, default: " "},
    identificacion: { type:String, require:true, default: " "},
    password: {type:String, require:true},
    rol : {type:mongoose.Schema.Types.ObjectId,ref:'Rol',require:true},
    createdat : {type: Date, default: Date.now}
});
//{collection: 'Usuario'});

export default  mongoose.model('Usuario', usuarioSchema); //Usuario
