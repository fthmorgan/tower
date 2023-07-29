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
        <button :disabled="towerEvent.isCanceled == true"  @click="attendTowerEvent()">Attend Event</button>
      </div>
    </div>
    <div class="d-flex pt-3" v-for="t in tickets" :key="t.id">
          <img class="ticket-img round mx-1" :src="t.profile?.picture">

          <h1>{{ t.profile.name }}</h1>
        </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import {commentsService} from '../services/CommentsService.js'
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState.js";
// import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import { ticketsService } from "../services/TicketsService.js";

export default {
  setup(){

  const route = useRoute()

  async function getCommentsByEventId() {
  try {
    const eventId = route.params.eventId
    await commentsService.getCommentsByEventId(eventId)
  } catch (error) {
    Pop.error(error.message)
  }
}


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
  getCommentsByEventId()
})

// onMounted(() => {
//   getTowerEventById()
// })

    return {
      towerEvent: computed(() => AppState.activeTowerEvent),
      tickets: computed(() => AppState.eventTickets),
      account: computed(() => AppState.account),
      isTicketHolder: computed(() => {
        return AppState.eventTickets.find(t => t.accountId == AppState.account)
      }),

    async attendTowerEvent() {
      try {
        logger.log('attend event')

        const activeTowerEvent = route.params.eventId

        // const ticketData = {}

        // ticketData.eventId = eventId
        const ticketData = { eventId: activeTowerEvent }

        await ticketsService.attendTowerEvent(ticketData)

        AppState.activeTowerEvent.ticketCount++

      } catch (error) {
        Pop.error(error.message)
      }
    },

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
.ticket-img {
  height: 10vh;
  width: 10vh;

}
</style>