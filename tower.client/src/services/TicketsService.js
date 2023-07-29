import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {


  async attendTowerEvent(ticketData) {


    const res = await api.post('api/tickets', ticketData)

    logger.log('[ATTENDING EVENT]', res.data)

    AppState.eventTickets.push(new Ticket(res.data))
  }

}

export const ticketsService = new TicketsService()