import home from "../components/home.vue" 
import dentista from "../components/dentistas.vue"
import usuarios from "../components/usuarios.vue"
import login from "../components/login.vue"
import progcitas from "../components/progcitas.vue"
import Personal from "../components/personal_clinico.vue"
import pacientes from "../components/pacientes.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/personal", component:Personal},
    {path:"/",component:login},
    {path:"/home",component: home},
    {path:"/dentista", component: dentista},
    {path:"/usuarios",component: usuarios},
    {path:"/citasmet", component: progcitas},
    {path:"/pacientes", component: pacientes},
]
export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})