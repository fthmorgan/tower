import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return tickets
  }
  async deleteTicket(ticketId, userId) {

  }
  async createTicket(ticketData) {
    const towerEvent = await towerEventsService.getTowerEventById(ticketData.eventId)

    if (towerEvent.isCanceled == true) {
      throw new Forbidden(`${towerEvent.name} HAS BEEN CANCELED`)
    }
    let newTicket = await dbContext.Tickets.create(ticketData)

    await newTicket.populate('profile')

    return newTicket

  }

  async getMyTickets(accountId) {
    const eventTickets = await dbContext.Tickets.find({ accountId })
      .populate({
        path: 'event',
        populate: {
          path: 'creator ticketCount'
        }
      })
    return eventTickets
  }
}


export const ticketsService = new TicketsService()