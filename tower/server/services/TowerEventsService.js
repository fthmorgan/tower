import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {

  async cancelTowerEvent(eventId, userId) {
    const towerEventToCancel = await this.getTowerEventById(eventId)

    if (towerEventToCancel.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE CREATOR OF THE ${towerEventToCancel.name} ${towerEventToCancel.startDate} EVENT!`)
    }
    if (towerEventToCancel.isCanceled == true) {
      throw new BadRequest(`Event at eventId: ${eventId} does not exist`)
    }
    towerEventToCancel.isCanceled = true
    await towerEventToCancel.save()
    return towerEventToCancel
  }

  async updateTowerEvent(eventId, userId, towerEventData) {
    const originalTowerEvent = await this.getTowerEventById(eventId)

    if (originalTowerEvent.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE CREATOR OF THE ${originalTowerEvent.name} ${originalTowerEvent.startDate} EVENT!`)
    }

    if (originalTowerEvent.isCanceled == true) {
      throw new BadRequest(`Event at eventId: ${eventId} does not exist`)
    }


    originalTowerEvent.name = towerEventData.name || originalTowerEvent.name
    originalTowerEvent.description = towerEventData.description || originalTowerEvent.description
    originalTowerEvent.coverImg = towerEventData.coverImg || originalTowerEvent.coverImg
    originalTowerEvent.location = towerEventData.location || originalTowerEvent.location
    originalTowerEvent.startDate = towerEventData.startDate || originalTowerEvent.startDate
    originalTowerEvent.type = towerEventData.type || originalTowerEvent.type

    await originalTowerEvent.save()

    return originalTowerEvent

  }
  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
      .populate('creator ticketCount')
    if (!towerEvent) {
      throw new BadRequest(`Event at eventId: ${eventId} does not exist`)
    }
    return towerEvent
  }
  async createTowerEvent(towerEventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(towerEventData)
    await newTowerEvent
      .populate('creator ticketCount')

    return newTowerEvent
  }
  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('ticketCount')
    return towerEvents
  }

}

export const towerEventsService = new TowerEventsService()