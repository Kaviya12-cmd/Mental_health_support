const mongoose = require('mongoose');

const musicPreferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    genre: { type: String, required: true },
    mood: { type: String, required: true },
    searchQuery: { type: String }, // What was searched
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MusicPreference', musicPreferenceSchema);
