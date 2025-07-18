import mongoose, { mongo } from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      enum: ['iphone', 'android', 'laptop'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    notes: [noteSchema], // Embedded notes array
  },
  { timestamps: true }
);

export default mongoose.model('Ticket', ticketSchema);
