<template>
  <form @submit.prevent="createComment()">
            <div class="mb-3">
            <label for="body" class="form-label">Comment</label>
            <input required type="text" v-model="editable.body" class="form-control" id="body" placeholder="Comment..."
                >
        </div>

        <div class="text-end">
            <button class="btn btn-success" type="submit">Submit</button>
        </div>

  </form>
</template>


<script>
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService.js";
import { Modal } from "bootstrap";

export default {
  setup(){
const editable = ref({})
const route = useRoute()

    return{
      editable, 

        async createComment() {
    try {
      logger.log('[CREATING COMMENT]')

      const formData = editable.value
      formData.eventId = route.params.eventId
      await commentsService.createComment(formData)

      editable.value = {}
      Modal.getOrCreateInstance('#createCommentModal').hide()
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