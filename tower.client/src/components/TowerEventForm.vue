<template>
  <div>
    <form @submit.prevent="createTowerEvent()">
      <div>
        <label for="name" class="form-label">Name</label>
        <input v-model="editable.name" required type="text" class="form-control" id="name" placeholder="Event Name...">
      </div>
      <div class="mt-2">
        <label for="description" class="form-label">Description</label>
        <textarea type="text" required v-model="editable.description" id="description" class="form-control" cols="30" rows="10"></textarea>
      </div>
      <div class="mt-2 d-flex flex-column">
        <label for="coverImg" class="form-label">Event Image</label>
        <input type="url" required v-model="editable.coverImg" id="coverImg">
      </div>
      <div class="mt-2 d-flex flex-column">
        <label for="location">Location</label>
        <input required id="location" type="text" v-model="editable.location">
      </div>
      <div class="mt-2 d-flex flex-column">
        <label for="capacity">Capacity</label>
        <input required id="capacity" v-model="editable.capacity" type="number">
      </div>
      <div class="mt-2 d-flex flex-column">
        <label for="startDate">Start Date</label>
        <input required class="form-control" id="startDate" v-model="editable.startDate" type="datetime-local">
      </div>
      <div class="mt-2">
        <label for="type">Type of Event</label>
        <select required v-model="editable.type" for="type" class="form-select">
          <option selected disabled>Make Selection</option>
          <option v-for="t in types" :key="t" :value="t">
          {{ t }}
          </option>
        </select>
      </div>
      <div class="mt-3">
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";


export default {
  setup(){
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      types: ['concert', 'convention', 'sport', 'digital'],

async createTowerEvent() {
logger.log('[CREATED EVENT 1]')

try {
  const towerEventData = editable.value
  const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
  logger.log(towerEvent)
  editable.value = {}
  Modal.getOrCreateInstance('#createEventModal').hide()
  router.push({ name: 'TowerEvent', params: { eventId: towerEvent.id}})
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