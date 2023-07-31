<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

    <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light">My Tickets</h1>
      </div>
      <div class="col-md-3 ticket m-1 p-1" v-for="t in myTickets" :key="t.id">
        <h6>{{ t.event.name }}</h6>
        <img class="img-fluid rounded cover-img" :src="t.event.coverImg">
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
myTickets: computed(() => AppState.myTickets),
account: computed(() => AppState.account)
    }

  }
}



</script>

<style scoped>
img {
  max-width: 100px;
}



.ticket {
  background: rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);
max-width: 40vh;
}
</style>
