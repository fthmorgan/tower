import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async cancelTowerEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    logger.log('[EVENT CANCELED 2]', res.data)

    AppState.activeTowerEvent.isCanceled = true

  }

  async getTowerEventsById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    logger.log('[GOT ONE EVENT]', res.data)
    const towerEvent = new TowerEvent(res.data)
    AppState.activeTowerEvent = towerEvent
  }

  async getTowerEvents() {
    const res = await api.get('api/events')
    logger.log('[GOT NEW EVENTS]', res.data)

    const newTowerEvents = res.data.map(t => new TowerEvent(t))

    AppState.towerEvents = newTowerEvents

  }

  async createTowerEvent(towerEventData) {
    const res = await api.post('api/events', towerEventData)
    logger.log('[CREATED EVENT 2]', res.data)
    const towerEvent = new TowerEvent(res.data)
    return towerEvent

  }

}

export const towerEventsService = new TowerEventsService()