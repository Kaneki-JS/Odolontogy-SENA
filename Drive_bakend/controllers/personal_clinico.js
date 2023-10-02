import PersonalModel from "../models/personal_clinico.js"


const httpPersonal = {
    getPersonal: async (req, res) => {
        try {
            const personal = await PersonalModel.find({});
            res.json({ personal });
        } catch ( error ) {
            res.status(500).json({ mensaje: "Error al obtener las formaciones", error })
        }
    },

    postPersonal: async (req, res) => {
        const { nombre, direccion, cedula, estado, telefono, password } = req.body;
        const personal = new PersonalModel({
            nombre,
            direccion,
            cedula,
            estado, 
            telefono,
            password
        });

        try {
            const nuevoPersonal = await personal.save();

            res.json({
                mensaje: "Un personal insertado!!",
                nuevoPersonal
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al insertar el personal", error });
        }
    },


    putPersonal: async (req, res) => {
        const { cedula } = req.params; // Obtener cedula de los parámetros de la URL
        const { nombre, direccion, estado, telefono } = req.body;
        
        try {
            // Buscar y actualizar el registro por cedula
            const personal = await PersonalModel.findOneAndUpdate(
                { cedula }, 
                { nombre, direccion, telefono, estado }, 
                { new: true }
            );
            
            if (!personal) {
                return res.status(400).json({ mensaje: "Personal no encontrado" });
            }
    
            res.json({
                mensaje: "Datos actualizados exitosamente",
                personal
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: "Error al actualizar la formación", error });
        }
    },
    
    

    putPersonalEstado: async (req, res) => {
        try {
          const { id } = req.params  
          const {estado}=req.body
          const per = await PersonalModel.findById({_id:id})
          console.log(per);
          if(per){
            console.log(per);
            per.estado=estado
          }
    
          res.json({
              msj: "fue cambiado el estado",
              per,
          }) 
        } catch (error) {
          console.log(error);
        }
    
      }
}

export default httpPersonal