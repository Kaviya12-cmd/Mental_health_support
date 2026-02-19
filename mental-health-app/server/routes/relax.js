const express = require('express');
const router = express.Router();
const { getPoints, updatePoints, saveMusicPreference, getMusicHistory, searchYouTube } = require('../controllers/relaxController');
const { protect } = require('../middleware/auth');

router.get('/flashcards/points', protect, getPoints);
router.post('/flashcards/points', protect, updatePoints);

router.post('/music', protect, saveMusicPreference);
router.get('/music/history', protect, getMusicHistory);
router.post('/music/search', protect, searchYouTube); // New route

module.exports = router;
