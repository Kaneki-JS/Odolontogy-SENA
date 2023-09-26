import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useUsuariosStore = defineStore(
    "Usuarios", () => {
        const addUsuarios = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/usuarios`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getUsuarios = async () => {
            try {
                let res = await axios.get(`${urlBackend}/usuarios`)
                return res 
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editUsuarios = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/usuarios/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarUsuarios = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/usuarios/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addUsuarios, getUsuarios, editUsuarios, activarUsuarios, 
        }
    }
)
