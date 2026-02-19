const express = require('express');
const router = express.Router();
const { submitAssessment, getAssessmentStatus, getAssessmentQuestions } = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

router.get('/questions', protect, getAssessmentQuestions);
router.post('/', protect, submitAssessment);
router.get('/status', protect, getAssessmentStatus);

module.exports = router;
