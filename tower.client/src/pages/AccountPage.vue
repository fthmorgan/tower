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
      <div class="col-md-3" v-for="t in myTickets" :key="t.id">
        <h1>{{ t.event.name }}</h1>
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
</style>
