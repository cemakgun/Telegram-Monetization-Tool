const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const userService = require('../services/userService');

// Get user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId;
    const profile = await userService.getUserProfile(userId);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user settings
router.put('/settings', requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId;
    const settings = req.body;
    const updatedSettings = await userService.updateUserSettings(userId, settings);
    res.json(updatedSettings);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
