# AI-Based Sentiment Analysis and Psychological Support System

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Project Structure
- **server/**: Node.js + Express Backend
- **client/**: React + Vite Frontend

## Setup & Run Instructions

### 1. Database Setup
Ensure MongoDB is running locally on port 27017.
If not started, run:
```bash
mongod
```

### 2. Backend Setup
Open a terminal in VS Code:
```bash
cd server
npm install
npm start
```
*Server runs on http://localhost:5000*

### 3. Frontend Setup
Open a **new** terminal in VS Code:
```bash
cd client
npm install
npm run dev
```
*Client runs on http://localhost:5173*

## Features
- **User Authentication**: Secure Sign up/Login with JWT & Bcrypt.
- **Dashboard**: Access Assessment and Relax zones.
- **Assessment**: Mental health questionnaire with monthly tracking.
- **Chatbot**: AI support based on sentiment analysis.
- **Relax Zone**: 
    - **Flashcards**: Motivational quotes with gamified points.
    - **Music**: Mood-based search (redirects to Brave music search).
    - **Games**: link to external games.

## Environment Variables
The server comes with a `.env` file pre-configured for local development:
- PORT=5000
- MONGO_URI=mongodb://127.0.0.1:27017/mental-health-db
- JWT_SECRET=supersecretkey12345
