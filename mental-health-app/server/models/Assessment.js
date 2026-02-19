const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionSetId: {
        type: Number,
        required: true
    },
    riskLevel: {
        type: String, // 'Low Risk', 'Moderate Risk', 'High Risk'
        required: true
    },
    totalScore: {
        type: Number,
        required: true
    },
    breakdown: {
        type: Map,
        of: Number // e.g., { 'Stress': 5, 'Anxiety': 2 }
    },
    details: [
        {
            questionId: String,
            category: String,
            answerValue: Number,
            questionText: String
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
