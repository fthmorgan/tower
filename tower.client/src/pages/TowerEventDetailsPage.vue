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
          <h1>
            {{ towerEvent.name }}
          </h1>
          <p>{{ towerEvent.description }}</p>
          <h4>{{ towerEvent.location }}</h4>
          <h4>Capacity: {{ towerEvent.capacity }}</h4>
          <h4>{{ towerEvent.ticketCount }} Attendees</h4>
          <h5>{{ towerEvent.startDate.toLocaleDateString() }}</h5>
          <h6>{{ towerEvent.type }}</h6>
        </div>
        <div>
          <div>
            <button :disabled="towerEvent.isCanceled == true || towerEvent.creatorId != account.id" class="m-1" @click="cancelTowerEvent()">Cancel Event</button>
          </div>
          <div class="d-flex">
            <button class="m-1" :disabled="towerEvent.isCanceled == true || towerEvent.capacity == towerEvent.ticketCount"
v-if="!isTicketHolder"
            @click="attendTowerEvent()">Attend Event</button>
            <button class="m-1" :disabled="towerEvent.isCanceled == true" v-if="isTicketHolder" @click="removeTicket()">
              Unattend Event
            </button>
          </div>
          <div>
            <button class="m-1" data-bs-toggle="modal" data-bs-target="#createCommentModal">Comment</button>
          </div>
        </div>

        <!-- t.accountId == account.id -->
      </div>
    </div>
    <div class="row" >
      <div class="col-6">
            <div class="pt-3" v-for="t in tickets" :key="t.id">
              <img class="ticket-img rounded mx-1" :src="t.profile?.picture">
  
              <h6>{{ t.profile.name }}</h6>
            </div>
      </div>
        <div class="col-6 comment-box mb-3 pt-1 pb-2">
          <h1>Comments</h1>
          <div>
            <div class="row comment overflow-auto">
              <div class="col-10">
                <div class="row">
                </div>
                <div class=""  v-for="c in comments" :key="c.eventId">
                  <p>{{ c.body }}</p>
                  <button class="mb-2" @click="removeComment()">Delete Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
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

async function getTicketsByEventId() {
      try {
        const eventId = route.params.eventId
        await ticketsService.getTicketsByEventId(eventId)
      } catch (error) {
        logger.error(error)
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
  getTicketsByEventId()
})

// onMounted(() => {
//   getTowerEventById()
// })

    return {
      towerEvent: computed(() => AppState.activeTowerEvent),
      tickets: computed(() => AppState.eventTickets),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      isTicketHolder: computed(() => {
        return AppState.eventTickets.find(t => t.accountId == AppState.account.id)
      }),

    async attendTowerEvent() {
      try {
        logger.log('[ATTEND EVENT]')

        const activeTowerEvent = route.params.eventId

        const ticketData = { eventId: activeTowerEvent }

        await ticketsService.attendTowerEvent(ticketData)

        AppState.activeTowerEvent.ticketCount++

      } catch (error) {
        Pop.error(error.message)
      }
    },

      async removeTicket() {
        try {
          logger.log('[UNATTEND EVENT]')

          const ticketToRemove = AppState.eventTickets.find(t => t.accountId == AppState.account.id)
          const ticketId = ticketToRemove.id
          await ticketsService.removeTicket(ticketId)
          AppState.activeTowerEvent.ticketCount--
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async removeComment() {
        try {
          logger.log('[DELETE COMMENT]')

          const commentToRemove = AppState.comments.find(c => c.creatorId == AppState.account.id)
          const commentId = commentToRemove.id
          await commentsService.removeComment(commentId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
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
  height: 5vh;
  width: 5vh;

}

.comment-box {
background: rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);
max-width: 40vh;
}

.comment {
  max-height: 41vh;
  scrollbar-color: rebeccapurple green;
}
</style>