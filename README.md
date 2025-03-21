# StackTalk - Q&A Platform

A MERN stack Q&A platform where users can ask questions, provide answers, and engage with the community.

## Project Structure

- `frontend/` - React.js frontend application
- `backend-user/` - User Service (Node.js/Express)
- `backend-qna/` - QnA Service (Node.js/Express)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on http://localhost:3000

### User Service Setup
```bash
cd backend-user
npm install
npm run dev
```
The User Service will run on http://localhost:5000

### QnA Service Setup
```bash
cd backend-qna
npm install
npm run dev
```
The QnA Service will run on http://localhost:5001

## Features

- User registration with unique usernames
- Ask questions
- View all questions
- Answer questions
- View questions by specific users

## API Endpoints

### User Service (localhost:5000)
- POST /user - Create or fetch a user
- GET /user/:username/questions - Get all questions by a user

### QnA Service (localhost:5001)
- POST /questions - Ask a new question
- GET /questions - Get all questions
- GET /questions/:id - Get a question and its answers
- POST /questions/:id/answers - Add an answer

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Additional Tools: Mongoose, CORS 