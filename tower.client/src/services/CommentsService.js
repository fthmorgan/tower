import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)

    logger.log('[GETTING COMMENTS]', res.data)

    AppState.pictures = res.data.map(d => new Comment(d))
  }
}

export const commentsService = new CommentsService()