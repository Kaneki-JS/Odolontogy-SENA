import home from "../components/home.vue" 
import programas from "../components/programas.vue"
import usuarios from "../components/usuarios.vue"
import login from "../components/login.vue"
import progcitas from "../components/progcitas.vue"
import Personal from "../components/personal_clinico.vue"
import instrumentosEvaluacion from "../components/instrumentosEvaluacion.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/personal", component:Personal},
    {path:"/",component:login},
    {path:"/home",component: home},
    {path:"/usuarios",component: usuarios},
    {path:"/programas",component: programas},
    {path:"/citasmet", component: progcitas},
    {path:"/instrumentosEvaluacion",component: instrumentosEvaluacion},
]
export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})