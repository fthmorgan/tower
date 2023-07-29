import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .get('/:eventId/comments', this.getCommentsByEventId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.updateTowerEvent)
      .delete('/:eventId', this.cancelTowerEvent)

  }
  async getCommentsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentsService.getCommentsByEventId(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getTicketsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getTicketsByEventId(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async cancelTowerEvent(req, res, next) {
    try {
      const eventId = req.params.eventId

      const userId = req.userInfo.id

      const towerEvent = await towerEventsService.cancelTowerEvent(eventId, userId)

      return res.send(towerEvent)

    } catch (error) {
      next(error)
    }
  }
  async getTowerEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const towerEvent = await towerEventsService.getTowerEventById(eventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async createTowerEvent(req, res, next) {
    try {
      const towerEventData = req.body
      towerEventData.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async getTowerEvents(req, res, next) {
    try {
      const event = await towerEventsService.getTowerEvents()
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async updateTowerEvent(req, res, next) {
    try {
      const eventId = req.params.eventId

      const userId = req.userInfo.id

      const towerEventData = req.body

      const updatedTowerEvent = await towerEventsService.updateTowerEvent(eventId, userId, towerEventData)

      return res.send(updatedTowerEvent)
    } catch (error) {
      next(error)
    }
  }



}