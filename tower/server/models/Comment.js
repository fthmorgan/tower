import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  body: { type: String, required: true },
  isAttending: { type: Boolean, required: false }
}, {
  timestamp: true, toJSON: { virtuals: true }
})
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})