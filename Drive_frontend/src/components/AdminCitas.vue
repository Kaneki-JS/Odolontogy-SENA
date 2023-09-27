<template>
    <div>
        <button @click="confirmarCita">Confirmar Cita</button>
        <button @click="reprogramarCita">Reprogramar Cita</button>
        <button @click="cancelarCita">Cancelar Cita</button>
    </div>
</template>

<script>
    import { useAdminCitasStore } from './ruta_a_tu_store';

    export default {
    methods: {
        confirmarCita() {
        const store = useAdminCitasStore();
        store.confirmarCita('id_de_la_cita').then(response => {
            console.log('Cita confirmada:', response);
        }).catch(error => {
            console.error('Error al confirmar la cita:', error);
        });
    },
        reprogramarCita() {
        const store = useAdminCitasStore();
        store.reprogramarCita('id_de_la_cita').then(response => {
            console.log('Cita reprogramada:', response);
        }).catch(error => {
            console.error('Error al reprogramar la cita:', error);
        });
    },
        cancelarCita() {
        const store = useAdminCitasStore();
        store.cancelarCita('id_de_la_cita').then(response => {
            console.log('Cita cancelada:', response);
        }).catch(error => {
            console.error('Error al cancelar la cita:', error);
        });
    }
    }
}
</script>
