const FlashcardPoints = require('../models/FlashcardPoints');
const MusicPreference = require('../models/MusicPreference');
const axios = require('axios');
const ytSearch = require('yt-search'); // Added for YouTube search without API key
// or use fetch if Node > 18

// --- FLASHCARDS ---

// @desc    Get user points
// @route   GET /api/relax/flashcards/points
// @access  Private
const getPoints = async (req, res) => {
    try {
        const points = await FlashcardPoints.findOne({ user: req.user._id });
        res.json({ points: points ? points.points : 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user points
// @route   POST /api/relax/flashcards/points
// @access  Private
const updatePoints = async (req, res) => {
    try {
        const { points } = req.body;
        let userPoints = await FlashcardPoints.findOne({ user: req.user._id });

        if (!userPoints) {
            userPoints = new FlashcardPoints({ user: req.user._id, points });
        } else {
            userPoints.points += points;
        }

        await userPoints.save();
        res.json({ points: userPoints.points });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- MUSIC (SPOTIFY) ---

// Helper function to get Spotify Token
let spotifyToken = null;
let tokenExpiry = null;

const getSpotifyToken = async () => {
    if (spotifyToken && tokenExpiry && Date.now() < tokenExpiry) {
        return spotifyToken;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret || clientId.includes('your_')) {
        throw new Error('Spotify credentials not configured');
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const response = await axios.post('https://accounts.spotify.com/api/token', params, { // Axios used here
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    spotifyToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return spotifyToken;
};

// @desc    Search Spotify for tracks
// @route   POST /api/relax/music/search
// @access  Private
// @desc    Search YouTube for videos
// @route   POST /api/relax/music/search
// @access  Private
const searchYouTube = async (req, res) => {
    try {
        const { query } = req.body;

        const r = await ytSearch(query);
        const videos = r.videos.slice(0, 10);

        const tracks = videos.map(video => ({
            id: video.videoId,
            name: video.title,
            artist: video.author.name,
            album: 'YouTube Video',
            image: video.thumbnail,
            preview_url: null,
            uri: video.url
        }));

        res.json({ source: 'youtube', tracks });

    } catch (error) {
        console.error("YouTube Search Error:", error.message);
        res.status(500).json({ message: 'Failed to search YouTube' });
    }
};


// @desc    Save music preference (Legacy + New)
// @route   POST /api/relax/music
// @access  Private
const saveMusicPreference = async (req, res) => {
    try {
        const { genre, mood } = req.body;
        const searchQuery = `${mood} ${genre} music`;

        const musicPref = new MusicPreference({
            user: req.user._id,
            genre,
            mood,
            searchQuery
        });

        await musicPref.save();
        res.status(201).json(musicPref);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get music history
// @route   GET /api/relax/music/history
// @access  Private
const getMusicHistory = async (req, res) => {
    try {
        const history = await MusicPreference.find({ user: req.user._id }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPoints,
    updatePoints,
    saveMusicPreference,
    getMusicHistory,
    searchYouTube
};
