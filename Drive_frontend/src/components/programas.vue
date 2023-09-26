<template>
  <div class="card-container">
    <div>
      <q-table class="tabla" flat bordered title="Treats" :rows="proga" :columns="columns" row-key="id" :filter="filter"
        :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="20"
                :virtual-scroll-sticky-size-start="20" :pagination="pagination" :rows-per-page-options="[0]"
                @virtual-scroll="onScroll">>
        <template v-slot:top>
          <q-btn style="background-color: green" :disable="loading" label="Agregar" @click="showModal = true" />
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-estado="props">
          <q-td :props="props">
            <span class="text-green" v-if="props.row.estado == true">Activo</span>
            <span class="text-red" v-else>Inactivo</span>
          </q-td>
        </template>

        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn class="q-mx-sm" color="primary">📝</q-btn>
            <q-btn class="q-mx-sm" color="green" outline v-if="props.row.estado == false">✅</q-btn>
            <q-btn class="q-mx-sm" color="red" outline v-else>❌</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Modal para agregar programas -->
    <div>
      <q-dialog v-model="showModal">
        <q-card class="custom-modal">
          <q-card-section>
            <div class="text">Agregar Programa de Formacion</div>
            <q-input v-model="denominacion" label="Denominación" />
            <q-input v-model="codigo" label="Código" />
            <q-input v-model="version" label="Versión" />
            <q-input v-model="IdNivelFormacion" label="Nivel de formcaion" />
            <div>
              <q-select v-model="niveldeformacion" :options="opciones" label="Selecciona una opción" />
            </div>
            <div>
              <q-select v-model="redDeConocimientoSeleccionada" :options="opcionesRedDeConocimiento"
                label="Red de Conocimiento" />
            </div>
            <!-- inicio -->
            <q-card-section>
              <q-input class="input" v-model="archivoOEnlace" label="Archivo o enlace del diseño curricular" outlined
                dense clearable prepend-icon="attach_file" @clear="limpiarCampo">
                <template v-slot:append>
                  <q-icon name="attach_file" style="cursor: pointer" @click="abrirSelectorDeArchivos" />
                </template>
              </q-input>
            </q-card-section>
            <!-- fin -->
          </q-card-section>
          <q-card-section>
            <q-btn @click="showModal = false" label="Cancelar" />
            <q-btn @click="agregarformacion()" color="primary" label="Agregar" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let proga = ref([]);

const showModal = ref(false);
const denominacion = ref("");
const codigo = ref("");
const version = ref("");
const estado = ref(false);

let columns = [
  { name: "codigo", align: "center", label: "Codigo", field: "codigo" },
  {
    name: "denominacion",
    label: "Denominacion",
    align: "center",
    field: "denominacion",
  },
  { name: "version", label: "Version", align: "center", field: "version" },
  { name: "estado", label: "Estado", align: "center", field: "estado" },
  { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
];

const loading = ref(false);
const filter = ref("");

async function obtenerformacion() {
  let programas = await storeprogramas.getProgramasFormacion();
  console.log(programas);
  proga.value = programas.data.ProgramasFormacion;
  console.log(programas.data);
}

async function agregarformacion() {
  loading.value = true;
  let r = await storeprogramas.agregarPrograma({
    denominacion: denominacion.value,
    codigo: codigo.value,
    version: version.value

  });
  console.log(r);
  loading.value = false;
  obtenerformacion();
  limpiarFormulario();
  showModal.value = false;
}
function limpiarFormulario() {
  nombre.value = "";
  version.version = "";
  telefono.value = "";
}
const niveldeformacion = ref(null);
const opciones = [
  "auxiliar",
  "operario",
  "técnico",
  "profundización técnica",
  "tecnólogo",
  "especialización tecnológica",
];
//pedir red de conocimiento
/* const redDeConocimientoSeleccionada = ref(null);
const opcionesRedDeConocimiento = ref([]);

// Simula una solicitud a la base de datos para obtener las opciones
const obtenerOpcionesDesdeBaseDeDatos = async () => {
  try {
    // Realiza la solicitud a la API o base de datos para obtener las opciones
    // Reemplaza esta lógica con tu solicitud real
    const response = await tuFuncionParaObtenerOpcionesDesdeLaBaseDeDatos();

    // Asigna las opciones obtenidas a opcionesRedDeConocimiento
    opcionesRedDeConocimiento.value = response.data.opciones; // Asegúrate de ajustar esto según la estructura de tu respuesta
  } catch (error) {
    console.error("Error al obtener las opciones:", error);
  }
}; */
//pedir diseño curricular 
const archivoOEnlace = ref(""); // Variable para almacenar el nombre del archivo seleccionado

// Función para abrir el selector de archivos
const abrirSelectorDeArchivos = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  fileInput.addEventListener('change', handleFileSelection);
  document.body.appendChild(fileInput);
  fileInput.click();
};

// Función para manejar la selección de archivos
const handleFileSelection = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    archivoOEnlace.value = selectedFile.name;
    // Aquí puedes manejar el archivo seleccionado según tus necesidades
    alert(`Archivo seleccionado: ${selectedFile.name}`);
  }
  event.target.remove(); // Elimina el input de tipo file después de su uso
};

// Función para limpiar el campo
const limpiarCampo = () => {
  archivoOEnlace.value = "";
};

//fin
onMounted(async () => {
  await obtenerformacion();
  //obtenerOpcionesDesdeBaseDeDatos();
});
</script>

<style scoped>
.tabla {
  margin: 1%;
  border-color: rgba(0, 0, 0, 0.367);
}

.q-table__body td {
  font-weight: bold;

  /* Agrega otros estilos según tus necesidades */
}

.text {
  font-size: 200%;
}

.custom-modal {
  margin-top: -50%;
  height: 90%;
  width: 50%;
  margin: 10%;
  top: -20%;
}

.input {
  width: 107%;
  margin-left: -4%;
}
</style>