<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="towerEvent" class="col-md-3 pt-3">
        <div>
          <img :src="towerEvent.coverImg" class="img-fluid">
        </div>
        <div class="bg-danger">
          <h1 v-if="towerEvent.isCanceled == true">{{ towerEvent.name }} is Canceled</h1>
        </div>
        <div>
          <button :disabled="towerEvent.isCanceled == true" class="mt-3" @click="cancelTowerEvent()">Cancel Event</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState.js";
// import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";

export default {
  setup(){

  const route = useRoute()


async function getTowerEventById(eventId) {
try {
  // const eventId = route.params.eventId
  await towerEventsService.getTowerEventsById(eventId)
} catch (error) {
  Pop.error(error.message)
}
}

watchEffect(() => {
  getTowerEventById(route.params.eventId)
})

// onMounted(() => {
//   getTowerEventById()
// })

    return {
      towerEvent: computed(() => AppState.activeTowerEvent),

    async cancelTowerEvent() {
        try {
          logger.log('[CANCELING EVENT]')
          const wantsToCancel = await Pop.confirm()

          if(!wantsToCancel) {
            return
          }

          const eventId = route.params.eventId
          await towerEventsService.cancelTowerEvent(eventId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>