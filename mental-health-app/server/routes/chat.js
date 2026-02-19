const express = require('express');
const router = express.Router();
const { chat, getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.post('/', protect, chat);
router.get('/', protect, getChatHistory);

module.exports = router;
