<template>
  <div class="card-container">
    <div class="body">
      <div class="text">Ambientes de Formación</div>
      <button class="agregar" @click="showModalAgregar = true">
        Agregar
      </button>
    </div>
    <div>
      <!-- Itera a través de los ambientes y muestra cada uno en un card -->
      <div v-for="(ambiente, index) in ambientess" :key="index">
        <div class="card">
          <div class="top-half">
            <div class="info">
              <p><strong>Cedula:</strong> {{ ambiente.codigo }}</p>
              <p><strong>Nombre:</strong> {{ ambiente.nombre }}</p>
              <p><strong>Tipo:</strong> {{ ambiente.tipo }}</p>
            </div>
            <div class="buttons">
              <button @click="toggleDetails(index)" class="rotate-button">
                <div class="arrow-icon" :class="{ rotate: isRotated[index] }">
                  <img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" alt="Arrow" class="arrow-icon" />
                </div>
              </button>
              <button class="editar" @click="abrirModalEdicion(index)">
                <img src="https://cdn-icons-png.flaticon.com/512/650/650143.png" alt="Editar" class="arrow-icon" />
              </button>
            </div>
          </div>

          <q-slide-transition appear>
            <div v-show="cardStates[index]">
              <div class="bottom-half">
                <div class="info">
                  <p>
                    <strong>Descripción:</strong> {{ ambiente.descripcion }}
                  </p>
                  <p><strong>Documentos:</strong> {{ ambiente.documentos }}</p>
                  <p>
                    <strong>ID Centro de Formación:</strong>
                    {{ ambiente.idCentroDeFormacion }}
                  </p>
                </div>
              </div>
            </div>
          </q-slide-transition>
        </div>
      </div>
    </div>

    <!-- Modal para agregar ambientes -->
    <div>
      <q-dialog v-model="showModalAgregar">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text2">Agregar Ambiente</div>
            <q-input v-model="codigo" label="Codigo" />
            <q-input v-model="Nombre" label="Nombre" />
            <q-input v-model="Tipo" label="Tipo" />
            <q-input v-model="Descripcion" label="Descripcion" />
            <div>
              <q-select v-model="IdCentroFormacion" :options="opciones"
                label="Selecciona una Id de Centro de Formacion" />
            </div>
            <!-- inicio -->
            <q-card-section>
              <q-input class="input" v-model="archivoOEnlace" label="Documentos" outlined dense clearable
                prepend-icon="attach_file" @clear="limpiarCampo">
                <template v-slot:append>
                  <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
                </template>
              </q-input>
            </q-card-section>
            <!-- fin -->
          </q-card-section>
          <q-card-section>
            <q-btn @click="showModalAgregar = false" label="Cancelar" />
            <q-btn @click="agregarCita()" color="primary" label="Agregar" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <!-- Modal para editar ambientes -->
    <div>
      <q-dialog v-model="showModalEdicion">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text2">Editar Ambiente</div>
            <q-input v-model="codigo" label="Codigo" />
            <q-input v-model="Nombre" label="Nombre" />
            <q-input v-model="Tipo" label="Tipo" />
            <q-input v-model="Descripcion" label="Descripcion" />
            <div>
              <q-select v-model="IdCentroFormacion" :options="opciones"
                label="Selecciona una Id de Centro de Formacion" />
            </div>
            <!-- inicio -->
            <q-card-section>
              <q-input class="input" v-model="archivoOEnlace" label="Documentos" outlined dense clearable
                prepend-icon="attach_file" @clear="limpiarCampo">
                <template v-slot:append>
                  <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
                </template>
              </q-input>
            </q-card-section>
            <!-- fin -->
          </q-card-section>
          <q-card-section>
            <q-btn @click="showModalEdicion = false" label="Cancelar" />
            <q-btn @click="guardarCambios" color="primary" label="Guardar Cambios" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let ambientess = ref([]);
let showModalAgregar = ref(false);
let showModalEdicion = ref(false); // Variable para controlar el modal de edición
let codigo = ref("");
let Nombre = ref("");
let Tipo = ref("");
let Descripcion = ref("");
let IdCentroFormacion = ref("");
const archivoOEnlace = ref("");
const loading = ref(false);

async function agregarCita() {
  loading.value = true;
  let r = await StoreAmbiente.addAmbientesFormacion({
    nombre: Nombre.value,
    codigo: codigo.value,
    tipo: Tipo.value,
    descripcion: Descripcion.value,
    idCentroDeFormacion: IdCentroFormacion.value,
    documentos: archivoOEnlace.value,
  });
  getAmbientesformacion();
  /* console.log(Nombre.value, codigo.value, Tipo.value, Descripcion.value); */
}


async function getAmbientesformacion() {
  let Formacion = await StoreAmbiente.getAmbientesFormacion();
  ambientess.value = Formacion.data.AmbientesFormacion;
}

const cardStates = ref({});
const isRotated = ref({});
const toggleDetails = (index) => {
  // Cambia el estado de la card en el índice específico
  cardStates.value[index] = !cardStates.value[index];
  isRotated.value[index] = !isRotated.value[index];
};

const opciones = [
  "001 Centro Agroturistico sede san gil",
  "002 Centro Agroturistico sede socorro",
];

const abrirSelectorDeArchivos = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none";
  fileInput.addEventListener("change", handleFileSelection);
  document.body.appendChild(fileInput);
  fileInput.click();
};

// Función para manejar la selección de archivos
const handleFileSelection = (event) => {
  const selectedFile = event.target.files[0];
  const selectedFileName = selectedFile ? selectedFile.name : "";

  // Asignar el nombre del archivo al campo archivoOEnlace
  archivoOEnlace.value = selectedFileName;

  // Buscar la opción que corresponde al nombre del archivo
  const selectedOption = opciones.find((option) =>
    option.includes(selectedFileName)
  );

  if (selectedOption) {
    // Enviar el texto correspondiente a la opción seleccionada
    const textoDeOpcion = selectedOption;
    // Aquí puedes hacer lo que necesites con textoDeOpcion
    alert(`Texto de la opción seleccionada: ${textoDeOpcion}`);
  } else {
    // Manejar el caso en que no se encuentre una opción correspondiente
    alert(
      "No se encontró una opción correspondiente al archivo seleccionado."
    );
  }

  event.target.remove(); // Elimina el input de tipo file después de su uso
};



let idAmbienteEditando = ref(null);

// Función para abrir el modal de edición con los datos del ambiente seleccionado
const abrirModalEdicion = (index) => {
  idAmbienteEditando.value = index;
  const ambienteSeleccionado = ambientess.value[index];
  codigo.value = ambienteSeleccionado.codigo;
  Nombre.value = ambienteSeleccionado.nombre;
  Tipo.value = ambienteSeleccionado.tipo;
  Descripcion.value = ambienteSeleccionado.descripcion;
  IdCentroFormacion.value = ambienteSeleccionado.idCentroDeFormacion;
  archivoOEnlace.value = ambienteSeleccionado.documentos;
  showModalEdicion.value = true;
};

const guardarCambios = async () => {
  if (idAmbienteEditando.value !== null) {
    const index = idAmbienteEditando.value;
    const ambienteEditado = {
      codigo: codigo.value,
      nombre: Nombre.value,
      tipo: Tipo.value,
      descripcion: Descripcion.value,
      idCentroDeFormacion: IdCentroFormacion.value,
      documentos: archivoOEnlace.value,
    };

    // Llamar al método de la store para editar el ambiente en la base de datos
    const response = await StoreAmbiente.editAmbientesFormacion(
      ambientess.value[index]._id,
      ambienteEditado
    );

    if (response.status === 200) {

      ambientess.value[index] = ambienteEditado;
      showModalEdicion.value = false;
      idAmbienteEditando.value = null;
    } else {

      console.error('Error al guardar los cambios en el servidor');
    }
  }
};

onMounted(async () => {
  await getAmbientesformacion();
});
//editAmbientesFormacion   StoreAmbiente
</script>

<style scoped>
.body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 500%;
  color: green;
  margin-top: 2%;

}

.text2 {
  font-size: 400%;
  color: green;
  margin-top: 2%;

}

.agregar {
  background-color: green;
  width: 8%;
  height: 20%;
  border-radius: 8px;
  margin-left: 90%;
  color: white;
  font-size: 150%;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.agregar:hover {
  transform: scale(1.05);
  /* Aumenta el tamaño en un 5% */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  /* Agrega una sombra suave */
}

.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
}

.top-half {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 8px;
}

.bottom-half {
  margin-top: 16px;
}



.editar {
  margin-left: -45%;
  margin-top: 80%;
  width: 30%;
  height: 30%;
  background-color: rgba(255, 0, 0, 0);
  border: none;
}

.rotate-button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  width: 30%;
  height: 30%;
  margin-top: -15%;
  margin-left: 50%;
  outline: none;
  padding: 0;
}

.arrow-icon {
  width: 25px;
  height: 30px;
  /* rotate: 90deg; */
  transition: transform 0.5s ease;
  /* Duración y tipo de transición */
}

.rotate {
  transform: rotate(180deg);
  /* Gira 180 grados al hacer clic */
}
</style>