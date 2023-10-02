<template>
  <div class="q-pa-md">
      <div>
          <q-table flat bordered title="Usuarios" :rows="user" :columns="columns" row-key="id" :filter="filter"
              :loading="loading" table-header-class="" virtual-scroll :virtual-scroll-item-size="20"
              :virtual-scroll-sticky-size-start="20" :pagination="pagination" :rows-per-page-options="[0]"
              @virtual-scroll="onScroll">
              <template v-slot:top>
                  <q-btn style="background-color: rgb(25, 103, 204);" :disable="loading" label="Agregar" @click="agregar()" />
                  <div style="margin-left: 5%;" class="text-h4">Personal Clinico</div>
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
      <q-dialog v-model="alert">
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
                          <div class="q-gutter-md">
                              <q-input type="email" v-model="experiencia" label="Experiencia" />
                          </div>
                          <div class="q-gutter-md">
                              <q-input v-model="telefono" label="Telefono" />
                          </div>
                          <div class="q-gutter-md">
                              <q-input v-model="cedula" label="Cedula" />
                          </div>
                          <div class="q-gutter-md">
                              <q-input v-model="especialidad" label="Especialidad" />
                          </div>
                          <div class="q-gutter-md">
                              <q-input v-model="direccion" label="Direccion" />
                          </div>
                          <div class="q-gutter-md" v-if="bd === false">
                              <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'"
                                  label="Ingresar password">
                                  <template v-slot:append>
                                      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                          @click="isPwd = !isPwd" />
                                  </template>
                              </q-input>
                          </div>
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
import { usePersonalStore } from '../stores/personal_clinico.js';

const usePersonal = usePersonalStore();


let alert = ref(false)
let bd = ref(false)
let check = ref("")
let isPwd = ref(true);
let user = ref([])
let nombre = ref("")
let telefono = ref("")
let cedula = ref("")
let direccion = ref("")
let password =ref("")
let loading = ref(false)
let indice = ref(null)
let r = ref("")

let columns = [
  { name: 'nombre', align: 'center', label: 'Usuario', field: "nombre" },
  { name: 'telefono', label: 'Telefono', align: 'center', field: "telefono" },
  { name: 'estado', label: 'Estado', align: 'center', field: "estado" },
  { name: 'opciones', label: 'Opciones', align: 'center', field: "opciones" },
  { name: 'direccion', label: 'Direccion', align: 'center', field: "direccion" },
//   { name: 'password', label: 'Password', align: 'center', field: "password" }
]

const filter = ref('')

async function guardar() {
  loading.value = true
  let res = await usePersonal.postPersonal({
  nombre: nombre.value,
  cedula: cedula.value,
  telefono: telefono.value,
  direccion: direccion.value,
  password: password.value
})
  console.log(res);
  console.log("se guardo un nuevo miembro del personal");
  loading.value = false
  listarPersonal()
  // obtenerformacion()
  // limpiarFormulario()
}



async function editarUser() {
  loading.value = true
  console.log("hola estoy editando");
  try {
      let r = await usePersonal.putPersonal(indice.value, {
          nombre: nombre.value,
          direccion: direccion.value,
          telefono: telefono.value,
          cedula: cedula.value,
      })
      console.log(r);
      bd.value = false
      loading.value = false
      console.log("limpiando datos");
      await listarDentistas() // Espera a que listarDentistas termine antes de continuar
      limpiarFormulario()
  } catch (error) {
      console.error(error);
  }
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
  try {
      let est = await usePersonal.putPersonalEstado(r.value.id)
      console.log(est);
  } catch (error) {
      console.error(error);
  }
}


// async function activar(estado, personal) {
//   personal.value = personal._id;
//   try {
//     const personalActuali = await usePersonal.putPersonalEstado(personal.value, estado);
//     await listarPersonal();
//   } catch (error) {
//     console.error("Error al cambiar el estado del personal clínico", error);
//   }
// }


// async function activar(estado, personal) {
//   personal.value = personal._id;
//   if (estado == true) {
//   const personalActuali = await usePersonalStore.actuestado(personal.value, false);
//   await traeproductos();
// } else {
//   const personalActuali = await usePersonalStore.actuestado(personal.value, true);
//   await traeproductos();
//   }
// }

function edito(props) {
  bd.value = true
  r.value = props.row
  alert.value = true
  indice.value = r.value._id
  nombre.value = r.value.nombre
  direccion.value = r.value.direccion
  telefono.value = r.value.telefono
  cedula.value = r.value.cedula
  password.value = r.value.password
}

function limpiarFormulario() {
  console.log("limpiar datos");
  nombre.value = ""
  direccion.value = ""
  telefono.value = ""
  cedula.value = ""
  password.value = ""
}

async function listarPersonal() {
  try {
      let personal = await usePersonal.getPersonal();
      console.log(personal);
      user.value = personal.personal; // Quité .data.Dentistas
  } catch (error) {
      console.error("Error al obtener el personal", error);
  }
}

function agregar() {
  alert.value = true
}

onMounted(() => {
  listarPersonal();
  limpiarFormulario();
})
</script>

<style scoped>
#card {
  width: 35em;
  max-width: 100%;
}</style>