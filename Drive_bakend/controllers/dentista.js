import Dentista from "../models/dentista.js";

const httpDentista = {
    getDentistas: async (req, res) => {
        try {
            const dentistas = await Dentista.find({});
            res.json({ dentistas });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los dentistas", error });
        }
    },

    postDentista: async (req, res) => {
        const { nombre, especialidad, experiencia, telefono, cedula, direccion } = req.body;
        const nuevoDentista = new Dentista({
            nombre,
            especialidad,
            experiencia,
            telefono,
            cedula,
            direccion,
        });

        try {
            const dentistaGuardado = await nuevoDentista.save();
            res.json({
            mensaje: "Dentista insertado exitosamente",
            dentista: dentistaGuardado,
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al insertar el dentista", error });
    }
  },

  putDentista: async (req, res) => {
    const { cedula } = req.params;
    const { nombre, especialidad, experiencia, telefono, direccion } = req.body;

    try {
      const dentistaActualizado = await Dentista.findOneAndUpdate(
        { cedula },
        { nombre, especialidad, experiencia, telefono, direccion },
        { new: true }
      );

      if (!dentistaActualizado) {
        return res.status(400).json({ mensaje: "Dentista no encontrado" });
      }

      res.json({
        mensaje: "Datos del dentista actualizados exitosamente",
        dentista: dentistaActualizado,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al actualizar el dentista", error });
    }
  },


  putDentistaEstado: async (req, res) => {
    try {
      const { id } = req.params  
      const {estado}=req.body
      const den = await Dentista.findById({_id:id})
      console.log(den);
      if(den){
        console.log(den);
        den.estado=estado
      }

      res.json({
          msj: "fue cambiado el estado",
          den,
      }) 
    } catch (error) {
      console.log(error);
    }

  }
};

export default httpDentista;



// activarDentista: async (req, res) => {
  //   const { id } = req.params;

  //   try {
  //     const dentista = await Dentista.findByIdAndUpdate(id, { estado: true }, { new: true });

  //     if (!dentista) {
  //       return res.status(400).json({ mensaje: "Dentista no encontrado" });
  //     }

  //     res.json({
  //       mensaje: "Dentista activado exitosamente",
  //       dentista: dentista,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ mensaje: "Error al activar el dentista", error });
  //   }
  // },

  // desactivarDentista: async (req, res) => {
  //   const { id } = req.params;

  //   try {
  //     const dentista = await Dentista.findByIdAndUpdate(id, { estado: false }, { new: true });

  //     if (!dentista) {
  //       return res.status(400).json({ mensaje: "Dentista no encontrado" });
  //     }

  //     res.json({
  //       mensaje: "Dentista desactivado exitosamente",
  //       dentista: dentista,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ mensaje: "Error al desactivar el dentista", error });
  //   }
  // },
