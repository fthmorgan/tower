<template>
  <nav class="navbar navbar-expand-lg navbar-color px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1 class="nav-font text-light">Tower</h1>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
<li><div></div> </li>
      </ul>

<button type="button" data-bs-toggle="modal"
            data-bs-target="#createEventModal" v-if="account.id">New Event</button>

      <!-- LOGIN COMPONENT HERE -->
      <Login class="m-5" />
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import Login from './Login.vue';
import { AppState } from "../AppState.js";
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.navbar-color {
  background-color: rgb(63, 94, 251);
  font-family: 'Graduate', cursive;
  font-family: 'Roboto Slab', serif;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
