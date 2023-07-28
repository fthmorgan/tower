<template>
<div class="container-fluid">
  <div class="row justify-content-center">
<div class="col-12 col-md-10 m-3">
  <div class="bg-info d-flex justify-content-around p-3 rounded">
<button @click="filterBy = ''">All</button>
<button @click="filterBy = 'concert'">Concert</button>
<button @click="filterBy = 'convention'">Convention</button>
<button @click="filterBy = 'sport'">Sport</button>
<button @click="filterBy = 'digital'">Digital</button>
  </div>
</div>
  </div>
<div class="row d-flex justify-content-center">
  <div class="col-12 col-md-3 card m-md-3" v-for="t in towerEvents" :key="t.id">
    <!-- <h1>{{ t.name }}</h1>
    <img class="img-fluid" :src="t.coverImg"> -->
    <TowerEventCard :towerEventProp="t"/>
  </div>
</div>
</div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const filterBy = ref('')
    
    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error.message)
      }
    }

onMounted(() => {
  getTowerEvents()
})

return {
  filterBy,

towerEvents: computed(() => {
  if(filterBy.value == "") {
    return AppState.towerEvents
  } else {
    return AppState.towerEvents.filter(t => t.type == filterBy.value)
  }
}),
  
    }
  }
}
</script>

<style scoped lang="scss">
</style>
