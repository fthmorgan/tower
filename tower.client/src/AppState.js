import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],

  /** @type {import('./models/TowerEvent.js').TowerEvent | null} */
  activeTowerEvent: null,

  /** @type {import('./models/Ticket.js').Ticket[]} */
  eventTickets: [],

  /** @type {import('./models/Comments.js').Comments[]} */
  comments: [],

  /** @type {import('./models/Ticket.js').Ticket[]} */
  myTickets: []
})
