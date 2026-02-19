const Assessment = require('../models/Assessment');
const questionSets = require('../data/questionSets.js');

// Helper to flatten questions for easy lookup
const allQuestions = questionSets.flatMap(s => s.questions);

// @desc    Get Daily Question Set
// @route   GET /api/assessment/questions
// @access  Private
const getAssessmentQuestions = async (req, res) => {
    try {
        const isTestMode = req.query.test === 'true';
        const userId = req.user._id;

        // 1. Get user's last assessment
        const lastAssessment = await Assessment.findOne({ user: userId }).sort({ date: -1 });

        let nextSetId = 1;

        if (lastAssessment) {
            // Check if assessment was done today
            const lastDate = new Date(lastAssessment.date);
            const today = new Date();

            const isSameDay = lastDate.getDate() === today.getDate() &&
                lastDate.getMonth() === today.getMonth() &&
                lastDate.getFullYear() === today.getFullYear();

            if (isSameDay && !isTestMode) {
                return res.status(403).json({
                    message: 'You have already completed your assessment for today. Please come back tomorrow for the next set.',
                    nextSetAvailable: true
                });
            }

            // Determine next set logic
            // If we have a questionSetId in history, increment it.
            // If not (legacy data), start at 1.
            const lastSetId = lastAssessment.questionSetId || 0;

            // Cycle 1 -> 2 -> ... -> 10 -> 1 -> ...
            nextSetId = (lastSetId % 10) + 1;
        }

        // 2. Fetch the set
        const targetSet = questionSets.find(s => s.setId === nextSetId);

        if (!targetSet) {
            return res.status(500).json({ message: 'Question set configuration error' });
        }

        res.json({
            setId: targetSet.setId,
            questions: targetSet.questions,
            isTestMode
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit assessment result
// @route   POST /api/assessment
// @access  Private
const submitAssessment = async (req, res) => {
    try {
        const { answers, questionSetId } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid answers format' });
        }

        let totalScore = 0;
        let breakdown = {
            'Stress': 0,
            'Anxiety': 0,
            'Depression': 0,
            'Sleep': 0,
            'Motivation': 0
        };
        let details = [];

        // Validate and Calculate
        answers.forEach(ans => {
            // Find question in the specific set or global list
            const question = allQuestions.find(q => q.id === ans.questionId);

            if (question) {
                totalScore += ans.value;
                if (breakdown[question.category] !== undefined) {
                    breakdown[question.category] += ans.value;
                }
                details.push({
                    questionId: question.id,
                    questionText: question.text,
                    category: question.category,
                    answerValue: ans.value
                });
            }
        });

        // Determine Risk Level (Max Score = 10 * 3 = 30)
        let riskLevel = 'Low Risk';
        if (totalScore > 20) riskLevel = 'High Risk';
        else if (totalScore > 10) riskLevel = 'Moderate Risk';

        const assessment = new Assessment({
            user: req.user._id,
            questionSetId: questionSetId || 1, // Default to 1 if missing
            totalScore,
            riskLevel,
            breakdown,
            details
        });

        await assessment.save();

        res.status(201).json({ message: 'Assessment submitted successfully.', riskLevel, nextSetIn: 'Tomorrow' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get latest assessment status
// @route   GET /api/assessment/status
// @access  Private
const getAssessmentStatus = async (req, res) => {
    try {
        const isTestMode = req.query.test === 'true';
        const latestAssessment = await Assessment.findOne({ user: req.user._id }).sort({ date: -1 });

        if (!latestAssessment) {
            return res.json({ completed: false });
        }

        const lastDate = new Date(latestAssessment.date);
        const today = new Date();
        const isSameDay = lastDate.getDate() === today.getDate() &&
            lastDate.getMonth() === today.getMonth() &&
            lastDate.getFullYear() === today.getFullYear();

        if (isSameDay && !isTestMode) {
            return res.json({
                completed: true,
                lastDate: latestAssessment.date,
                allowRetake: false,
                message: "You have completed today's assessment."
            });
        }

        res.json({ completed: false, lastDate: latestAssessment.date, allowRetake: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitAssessment, getAssessmentStatus, getAssessmentQuestions };
