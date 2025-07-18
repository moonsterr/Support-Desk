import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import authenticateToken from '../middleware/middleware.js';

import Ticket from '../models/Ticket.js';

router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { username, email, product, description } = req.body;

    const ticket = await Ticket.create({
      username,
      email,
      product,
      description,
      owner: req.user.userId,
      notes: [],
    });

    res.status(201).send({ success: true, data: ticket });
  } catch (err) {
    res.status(400).send({ success: false, data: err.message });
  }
});
router.get('/get', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(404).send({ success: false, data: 'no user id' });
    }
    const tickets = await Ticket.find({ owner: userId }).populate('notes.user');
    return res.status(200).send({ success: true, data: tickets });
  } catch (error) {
    return res.status(404).send({ success: false, data: error.message });
  }
});

router.put('/addnote', authenticateToken, async (req, res) => {
  try {
    const { description, ticketId } = req.body;
    const userId = req.user.userId;
    if (!description) {
      return res
        .status(400)
        .send({ success: false, data: 'Note description is required' });
    }
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).send({ success: false, data: 'Ticket not found' });
    }
    ticket.notes.push({ user: userId, description });
    await ticket.save();
    await ticket.populate('notes.user');

    return res.status(200).send({ success: true, data: ticket });
  } catch (error) {
    return res.status(500).send({ success: false, data: error.message });
  }
});

router.delete('/delete/:ticketId', authenticateToken, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.userId;

    const ticket = await Ticket.findOne({ _id: ticketId });

    if (!ticket) {
      return res.status(404).json({ success: false, data: 'Ticket not found' });
    }

    await Ticket.deleteOne({ _id: ticketId });

    return res
      .status(200)
      .json({ success: true, data: 'Ticket deleted successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, data: err.message });
  }
});

export default router;
