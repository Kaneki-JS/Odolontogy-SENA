import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useRolesUsuariosStore = defineStore(
    "RolesUsuarios", () => {
        const addRolesUsuarios = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/RolesUsuarios`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getRolesUsuarios = async () => {
            try {
                let res = await axios.get(`${urlBackend}/RolesUsuarios`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editRolesUsuarios = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/RolesUsuarios/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarRolesUsuarios = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/RolesUsuarios/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addRolesUsuarios, getRolesUsuarios, editRolesUsuarios, activarRolesUsuarios, 
        }
    }
)