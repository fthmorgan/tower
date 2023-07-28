<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="text-light">
    Made by Faith
  </footer>
  
<ModalComponent id="createEventModal">
    <template #header>
      Create Event
    </template>

    <template #body>
      <TowerEventForm />
    </template>
</ModalComponent>


</template>

<script>
  import { computed } from 'vue'
  import { AppState } from './AppState'
  import Navbar from './components/Navbar.vue'
  import ModalComponent from "./components/ModalComponent.vue"
  import TowerEventForm from "./components/TowerEventForm.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, TowerEventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  background-color: rgb(113, 206, 163);
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
