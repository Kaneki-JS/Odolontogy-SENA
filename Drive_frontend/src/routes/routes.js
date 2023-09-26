import home from "../components/home.vue" 
import programas from "../components/programas.vue"
import usuarios from "../components/usuarios.vue"
import login from "../components/login.vue"
import ambientes from "../components/ambiente.vue"
import instrumentosEvaluacion from "../components/instrumentosEvaluacion.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/",component:login},
    {path:"/home",component: home},
    {path:"/usuarios",component: usuarios},
    {path:"/programas",component: programas},
    {path:"/ambientes",component: ambientes},
    {path:"/instrumentosEvaluacion",component: instrumentosEvaluacion},
]
export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})