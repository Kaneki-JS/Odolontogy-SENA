<template>
    <div class="q-pa-md">
        <div>
            <q-table flat bordered grid title="Instrumentos de evaluacion" :rows="instrumento" :columns="columns"
                row-key="name" :filter="filter" hide-header :loading="loading" virtual-scroll :virtual-scroll-item-size="20"
                :virtual-scroll-sticky-size-start="20"  :rows-per-page-options="[0]">
                <template v-slot:top>
                    <q-btn style="background-color: green;" :disable="loading" label="Agregar" @click="agregar()" />
                    <div style="margin-left: 5%;" class="text-h4">Instrumentos de evaluacion</div>
                    <q-space />
                    <q-input borderless dense debounce="300"
                        style="border-radius: 10px; border:grey solid 0.5px; padding: 5px;" color="primary"
                        v-model="filter">
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
                        <q-spinner-ios v-if="loading == true" color="green" size="2em" :thickness="10" />
                        <q-btn v-else class="q-mx-sm" color="primary" outline @click="edito(props)">📝</q-btn>
                        <q-btn class="q-mx-sm" color="green" outline @click="activar(props)"
                            v-if="props.row.estado == false">✅</q-btn>
                        <q-btn class="q-mx-sm" color="red" outline @click="activar(props)" v-else>❌</q-btn>
                    </q-td>
                </template>
            </q-table>            
        </div>
        <q-dialog v-model="nuevo">
            <q-card id="card">
                <q-card-section>
                    <div class="text-h6">Registro</div>
                </q-card-section>
                <q-card-section class="q-pt-none" id="card">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <div class="q-gutter-md">
                                <q-input v-model="nombre" label="Nombre" />
                            </div>
                            <q-card-section>
                                <q-input class="input" v-model="archivoOEnlace"
                                    label="Documentos" outlined dense clearable prepend-icon="attach_file"
                                    @clear="limpiarCampo">
                                    <template v-slot:append>
                                        <q-icon name="attach_file" style="cursor: pointer"
                                            @click="abrirSelectorDeArchivos" />
                                    </template>
                                </q-input>
                            </q-card-section>
                        </q-card-section>
                        <q-card-section>
                            <div role="alert"
                                style="border: 2px solid red; border-radius: 20px; text-align: center; background-color: rgba(255, 0, 0, 0.304);"
                                v-if="check !== ''">
                                <div>
                                    {{ check }}
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" @click="limpiarFormulario()" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" v-if="bd === false" @click="guardar()" color="primary" v-close-popup />
                    <q-btn flat label="Editar Usuario" v-else @click="editarUser()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
let nuevo = ref(false)
let bd = ref(false)
let check = ref("")
let isPwd = ref(true);
let instrumento = ref([])
let nombre = ref("")
let docuemento = ref("")
let loading = ref(false)
let indice = ref("")
let r = ref("")

let columns = [
    { name: 'nombre', align: 'center', label: 'Usuario', field: "nombre" },
    { name: 'docuento', label: 'Docuentos', align: 'center', field: "documento" },
    { name: 'estado', label: 'Estado', align: 'center', field: "estado" },
    { name: 'opciones', label: 'Opciones', align: 'center', field: "opciones" },
]
const filter = ref('')
async function guardar() {
    loading.value = true
    let r = await useInstumentos.addInstrumentosEvaluacion({
        nombre: nombre.value,
        docuemento: docuemento.value
    })
    console.log(r);
    console.log("se guardo un nuevo usuario");
    loading.value = false
    listarinstrumentos()
    limpiarFormulario()
}

async function editarUser() {
    loading.value = true
    console.log("hola estoy editando");
    let r = await useUsuario.editUsuarios(indice.value, {
        nombre: nombre.value,
    })
    console.log(r);
    bd.value = false
    loading.value = false
    console.log("limpiando datos");
    listarinstrumentos()
    limpiarFormulario()
}

async function activar(props) {
    r.value = props.row
    if (r.value.estado === true) {
        r.value.estado = false
        console.log(r.value.estado, "resultado del if condicion");
    } else {
        r.value.estado = true
        console.log(r.value.estado, "resultado del else condicion");
    }
    let est = await useUsuario.activarUsuarios(r.value._id)
    console.log(est);
}
const cardStates = ref({});
const isRotated = ref({});
const toggleDetails = (index) => {
    // Cambia el estado de la card en el índice específico
    cardStates.value[index] = !cardStates.value[index];
    isRotated.value[index] = !isRotated.value[index];
};

const abrirSelectorDeArchivos = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", handleFileSelection);
    document.body.appendChild(fileInput);
    fileInput.click();
};

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


function edito(props) {
    bd.value = true
    r.value = props.row
    nuevo.value = true
    indice.value = r.value._id
    nombre.value = r.value.nombre
}

function limpiarFormulario() {
    console.log("limpiar datos");
    nombre.value = ""
    docuemento.value = ""
}

listarinstrumentos()
async function listarinstrumentos() {
    let instrumentos = await useInstumentos.getInstrumentosEvalacion()
    console.log(instrumentos);
    instrumento.value = instrumentos.data.InstrumentosEvaluacion
}

function agregar() {
    nuevo.value = true
}
onMounted(() => {
    listarinstrumentos()
    limpiarFormulario()
})

</script>
<style scoped>
#card {
    width: 35em;
    max-width: 100%;
}
</style>