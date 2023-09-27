<template>
    <q-layout view="lHh lpR lFf">
        <div class="row" style="position: relative;">
            <div class="col-5" id="imagen">
                <img :src="currentImage" style="width: 1000px;" class="bg" alt="Cargando imagen..." id="img">
            </div>

            <div class="col-7" style="position: relative;">
                <div id="cart">
                    <q-card id="card" flat bordered class="my-card">
                        <q-card-section>
                            <h5 id="h1" style="display: flex; justify-content: center;">Iniciar sesion</h5>
                        </q-card-section>

                        <q-card-section class="q-pa-md">
                            <div role="alert"
                                style="border: 2px solid red; border-radius: 20px; text-align: center; background-color: rgba(255, 0, 0, 0.304);"
                                v-if="check !== ''">
                                <div>
                                    {{ check }}
                                </div>
                            </div>
                            <div class="q-gutter-md">
                                <q-input label="Cedula" v-model="cedula" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'"
                                    label="Ingresar password">
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                            @click="isPwd = !isPwd" />
                                    </template>
                                </q-input>
                            </div>

                        </q-card-section>

                        <div style="display: flex;  justify-content: center;">
                            <q-spinner-ios v-if="loading == true" color="rgb(20, 101, 206)" size="2em" :thickness="10" />
                            <q-btn v-else style="background-color: rgb(20, 101, 206);display: flex; justify-content: center;"
                                @click="pruebaLogin()">
                                Iniciar</q-btn>
                        </div>

                        <q-card-section>
                            <div class="cursor-pointer" style="color: blue;" @click="olvideContra()">
                                {{ label }}
                                <!-- <q-popup-edit v-model="label" auto-save v-slot="scope">
                                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                            </q-popup-edit> -->
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>

        <q-dialog v-model="ingresaCorreo">
            <q-card id="card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#008000" fill-opacity="0.5"
                        d="M0,288L12.6,250.7C25.3,213,51,139,76,112C101.1,85,126,107,152,117.3C176.8,128,202,128,227,149.3C252.6,171,278,213,303,224C328.4,235,354,213,379,181.3C404.2,149,429,107,455,96C480,85,505,107,531,106.7C555.8,107,581,85,606,85.3C631.6,85,657,107,682,122.7C707.4,139,733,149,758,176C783.2,203,808,245,834,272C858.9,299,884,309,909,304C934.7,299,960,277,985,261.3C1010.5,245,1036,235,1061,208C1086.3,181,1112,139,1137,138.7C1162.1,139,1187,181,1213,202.7C1237.9,224,1263,224,1288,229.3C1313.7,235,1339,245,1364,229.3C1389.5,213,1415,171,1427,149.3L1440,128L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z">
                    </path>
                </svg>
                <q-card-section>
                    <div class="text-h4">Restablecer contraseña</div>
                </q-card-section>
                <q-card-section class="q-pt-none" id="">
                    <p>Ingrese su direccion de correo electronico para restablecer su contraseña.</p>
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <div class="q-gutter-md">
                                <q-input v-model="nombre" label="E-mail" />
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
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Siguiente" @click="comprovar()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="compruevaCorreo">
            <q-card id="card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#008000" fill-opacity="0.5"
                        d="M0,288L12.6,250.7C25.3,213,51,139,76,112C101.1,85,126,107,152,117.3C176.8,128,202,128,227,149.3C252.6,171,278,213,303,224C328.4,235,354,213,379,181.3C404.2,149,429,107,455,96C480,85,505,107,531,106.7C555.8,107,581,85,606,85.3C631.6,85,657,107,682,122.7C707.4,139,733,149,758,176C783.2,203,808,245,834,272C858.9,299,884,309,909,304C934.7,299,960,277,985,261.3C1010.5,245,1036,235,1061,208C1086.3,181,1112,139,1137,138.7C1162.1,139,1187,181,1213,202.7C1237.9,224,1263,224,1288,229.3C1313.7,235,1339,245,1364,229.3C1389.5,213,1415,171,1427,149.3L1440,128L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z">
                    </path>
                </svg>
                <q-card-section>
                    <div class="text-h4">Restablecer contraseña</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <p>Revice su correo '{{ correo }}', recibirá un correo electronico con instrucciones para
                                restablecer su contraseña. Si no llega, asegurese de revisar su carpeta Span</p>
                        </q-card-section>
                        <q-card-section>

                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Iniciar sesion" to="/" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="passwordNueva">
            <q-card id="card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#008000" fill-opacity="0.5"
                        d="M0,288L12.6,250.7C25.3,213,51,139,76,112C101.1,85,126,107,152,117.3C176.8,128,202,128,227,149.3C252.6,171,278,213,303,224C328.4,235,354,213,379,181.3C404.2,149,429,107,455,96C480,85,505,107,531,106.7C555.8,107,581,85,606,85.3C631.6,85,657,107,682,122.7C707.4,139,733,149,758,176C783.2,203,808,245,834,272C858.9,299,884,309,909,304C934.7,299,960,277,985,261.3C1010.5,245,1036,235,1061,208C1086.3,181,1112,139,1137,138.7C1162.1,139,1187,181,1213,202.7C1237.9,224,1263,224,1288,229.3C1313.7,235,1339,245,1364,229.3C1389.5,213,1415,171,1427,149.3L1440,128L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z">
                    </path>
                </svg>
                <q-card-section>
                    <div class="text-h4">Restablecer contraseña</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <p>Ingrese su nueva contraseña para restablecer el acceso a su cuenta.</p>
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md">
                            <div class="q-gutter-md">
                                <q-input v-model="password" label="Contraseña" />
                            </div>
                            <div class="q-gutter-md">
                                <q-input v-model="password" label="Confirme contraseña" />
                            </div>
                        </q-card-section>
                        <q-card-section>

                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="primary" v-close-popup />
                    <q-btn flat label="Cambiar contraseña" @click="guardar()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoginStore } from '../stores/login.js';
import { useRouter } from "vue-router";
import axios from 'axios';

const useLogin = useLoginStore();
let router = useRouter();
let ingresaCorreo = ref(false);
let compruevaCorreo = ref(false);
let passwordNueva = ref(false);
let label = ref('Olvidaste la contraseña')
let isPwd = ref(true);
let loading = ref(false)
let correo = ref("raul26@gmail.com")
let text = ref('')
let r = ref("")
let cedula = ref("");
let password = ref("");
let check = ref("");

function olvideContra() {
    ingresaCorreo.value = true;
}

function comprovar() {
    compruevaCorreo.value = true
}


async function pruebaLogin() {
    try {
        loading.value = true
        r = await useLogin.validar(cedula.value, password.value)
        console.log(r);
        const resp = r.status
        if (resp == 200) {
            console.log("sesion exitosa");
            router.push("/home");
        } else {
            check.value = "Error al iniciar sesion"
        }
    } catch (error) {
        loading.value = true
        console.log("Hay un error en la funcion pruebaLogin");
    }
    loading.value = false
}


const images = [
    'https://i.pinimg.com/originals/50/68/82/506882c848b883117283acc5c101095a.png',
    'https://clinic-cloud.com/wp-content/uploads/2022/03/partes-de-una-clinica-dental.jpg',
    'https://latarde.com/wp-content/uploads/2021/03/Clinica-Dental.jpg',
    'https://gacetadental.com/wp-content/uploads/2022/07/Clinica-dental-1-1.jpg',
    // Agrega más URLs de imágenes aquí
];
const currentImageIndex = ref(0);
const currentImage = ref(null);

const changeImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
    currentImage.value = images[currentImageIndex.value];
};

let timer;

onMounted(() => {
    setTimeout(() => {
        changeImage();
        timer = setInterval(changeImage, 10000);
    }, 0);

    return () => {
        clearInterval(timer);
    };
});

</script>
<style scoped>
.imagen {
    display: flex;
    height: 100vh;
    margin: 0;
    padding: 0;
    border: 1px solid #ccc;
    overflow: hidden;
    background-color: black;
    position: relative;
}

/* #card {
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 10%;
    display: block;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(29, 88, 32, 0.35);
    border-radius: 10px;
} */

#cart {
    width: 25rem;
    height: 30rem;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#img {
    max-width: 100%;
    max-height: 100%;
    height: 100vh;
    display: flex;
    margin-bottom: 0;
    border-radius: 2px;
    border: 0.5px solid #999;
    object-fit: cover;
    object-position: center;
}

.h1 {
    color: white;
    /* A light text makes a nice bright flame source */
    background: black;
    /* A dark background gives some contrast */
    letter-spacing: 3em;
    /* Big text shows off the effect best */
    font-weight: bold;
}
</style> 