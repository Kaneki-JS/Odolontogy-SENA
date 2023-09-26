import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useLoginStore = defineStore(
    "login", () => {
        let loading = ref(false)
        const validar = async ( cedula , password) =>{
            try{
                loading.value = (true)
                const info = {
                    cedula, 
                    password
                }
                const res = await axios.post(`${urlBackend}/login` , info)
                
                return res
            }catch (error){
                loading.value = (true)
                console.log("error en la peticion inicio sesion");
                console.log(error);
            }
            loading.value = (false)
        }
        return {
            validar
        }
    }
)