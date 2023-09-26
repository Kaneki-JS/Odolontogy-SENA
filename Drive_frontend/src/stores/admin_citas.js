import Vuex from 'vuex';
import CitasModel from '../models/Citas.js';

export default new Vuex.Store({
  state: {
    // Define el estado inicial de tu aplicación aquí
    citas: [],
  },
  mutations: {
    SET_CITAS(state, citas) {
      state.citas = citas;
    },
    CONFIRMAR_CITA(state, id) {
      // Lógica para confirmar la cita
    },
    REPROGRAMAR_CITA(state, { id, fecha, hora }) {
      // Lógica para reprogramar la cita
    },
    CANCELAR_CITA(state, id) {
      // Lógica para cancelar la cita
    },
  },
  actions: {
    async fetchCitas({ commit }) {
      try {
        const response = await CitasModel.getAllCitas(); // Implementa un método en CitasModel para obtener todas las citas
        commit('SET_CITAS', response.data.citas);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    },
    async confirmarCita({ commit }, id) {
      try {
        // Lógica para confirmar la cita
        commit('CONFIRMAR_CITA', id);
      } catch (error) {
        console.error('Error al confirmar la cita:', error);
      }
    },
    async reprogramarCita({ commit }, { id, fecha, hora }) {
      try {
        // Lógica para reprogramar la cita
        commit('REPROGRAMAR_CITA', { id, fecha, hora });
      } catch (error) {
        console.error('Error al reprogramar la cita:', error);
      }
    },
    async cancelarCita({ commit }, id) {
      try {
        // Lógica para cancelar la cita
        commit('CANCELAR_CITA', id);
      } catch (error) {
        console.error('Error al cancelar la cita:', error);
      }
    },
  },
});
