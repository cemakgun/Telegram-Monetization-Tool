const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const telegramService = require('../services/telegramService');

// Webhook for Telegram updates
router.post('/webhook', async (req, res) => {
  try {
    await telegramService.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.sendStatus(500);
  }
});

// Send message (protected route)
router.post('/send', requireAuth, async (req, res) => {
  try {
    const { chatId, message } = req.body;
    const result = await telegramService.sendMessage(chatId, message);
    res.json(result);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
