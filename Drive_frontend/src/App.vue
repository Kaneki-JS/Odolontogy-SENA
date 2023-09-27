<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated class="text-white" id="header">
        <q-toolbar>
          <q-avatar>
           <!--  <img src="../src/img/logo_sena.png" alt=""> -->
          </q-avatar>
          <q-toolbar-title>
          </q-toolbar-title>
          <button v-if="!isInLoginComponent" class="btng">
            <q-item v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section></q-item-section>
          </q-item>
        </button>
        </q-toolbar>
      </q-header>

    <q-drawer v-if="!isInLoginComponent" v-model="drawer" style="background-color: rgb(20, 101, 206)" show-if-above :mini="miniState"
      @mouseover="miniState = false" @mouseout="miniState = true" mini-to-overlay :width="200" :breakpoint="500" bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" style="background-color: white">
        <q-list padding>
          <q-item clickable v-ripple id="btn" to="/home">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>Inicio </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/personal">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Personal</q-item-section>
          </q-item>


          <q-item clickable v-ripple to="/usuarios">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section> Usuarios</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/programas">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>

            <q-item-section> Programas </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/citasmet">
            <q-item-section avatar>
              <q-icon
                name="img:https://cdn-icons-png.flaticon.com/512/1060/1060915.png"
              />
            </q-item-section>

            <q-item-section> Programar citas </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/instrumentosEvaluacion">
            <q-item-section avatar>
              <q-icon name="quiz" />
            </q-item-section>

            <q-item-section> Instrumentos de Evaluacion </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section> Salir </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
let drawer= ref(false)
let miniState= ref(true)
const leftDrawerOpen = ref(false);
const route = useRoute(); // Obtén la información de la ruta actual

// Calcula si estás en el componente de inicio de sesión
const isInLoginComponent = computed(() => {
  return route.path === '/'; // La ruta del componente Login
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>


<style scoped>
#text {
  font-size: 20px;
  font-family: cursive;
}

#btnlat {
  margin-left: 5px;
  margin-top: 5px;
  filter: invert(100);
}

#avatar {
  height: 50px;
  width: 60px;
  filter: invert(1);
}

#avarat2 {
  width: 70px;
}

#lateral {
  background-color: rgba(83, 151, 240, 0.548);
  font-family: cursive;
}

#header {
  background-color: rgba(83, 154, 247, 0.623);
  font-family: cursive;
}

/*botones */
#vende {
  display: flex;
  background-color: rgb(255, 255, 255);

  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}

#vende:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.779);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#vehicu {
  display: flex;


  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}

#vehicu:hover {
  transform: scale(1.1);

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

.custom-link {
  text-decoration: none;
  /* Eliminar subrayado */
  color: black;
}


.btng {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  width: 4%;
  height: 2%;
  filter: invert();
}

.btng:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0);
}

#logout {
  width: 70%;
}</style>