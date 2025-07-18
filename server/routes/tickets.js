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

export default router;
