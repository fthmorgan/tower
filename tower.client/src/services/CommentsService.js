import { Comment } from "../models/Comment.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)

    logger.log('[GETTING COMMENTS]', res.data)

    AppState.comments = res.data.map(d => new Comment(d))
  }

  async createComment(formData) {
    const res = await api.post('api/comments', formData)
    logger.log('[CREATED COMMENT]', res.data)
    const newComment = new Comment(res.data)
    AppState.comments.unshift(newComment)
  }

  async removeComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('[REMOVING COMMENTS]', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }
}

export const commentsService = new CommentsService()