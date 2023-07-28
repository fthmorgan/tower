import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'digital' },
  },
  {
    timestamps: true, toJSON: {
      virtuals: true
    }
  })
TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  count: true
})