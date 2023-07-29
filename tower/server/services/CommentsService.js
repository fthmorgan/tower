import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
  async deleteComment(commentId, userId) {
    const commentToBeRemoved = await dbContext.Comments.findById(commentId)

    if (!commentToBeRemoved) {
      throw new BadRequest(`Comment does not exist`)
    }

    // if (commentToBeRemoved.accountId != userId) {
    //   throw new Forbidden(`Comment is not yours`)
    // }

    await commentToBeRemoved.remove()
    return commentToBeRemoved
  }
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator')
    return comments
  }
  async createComment(commentData) {
    const event = await towerEventsService.getTowerEventById(commentData.eventId)

    const comment = await dbContext.Comments.create(commentData)

    await comment.populate('creator')
    return comment
  }
}



export const commentsService = new CommentsService()