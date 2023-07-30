import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/Tickets`)
    logger.log('[GETTING TICKETS]', res.data)
    AppState.eventTickets = res.data.map(t => new Ticket(t
    ))
  }

  async attendTowerEvent(ticketData) {


    const res = await api.post('api/tickets', ticketData)

    logger.log('[ATTENDING EVENT]', res.data)

    AppState.eventTickets.push(new Ticket(res.data))
  }

  async removeTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('[REMOVING REMOVING]', res.data)
    AppState.eventTickets = AppState.eventTickets.filter(t => t.id != ticketId)
  }

  async getMyTickets() {
    try {
      const res = await api.get('account/tickets')
      logger.log('[GET MY TICKETS]', res.data)
      AppState.myTickets = res.data.map(d => new Ticket(d))
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }

}

export const ticketsService = new TicketsService()