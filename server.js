// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');



dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Make io available to controllers
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Route for testing
app.get('/', (req, res) => res.send('Kirinyaga Smart App API is running...'));
// routes
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tenders', require('./routes/tenderRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ai', require('./routes/chatbotRoutes')); // <-- Add this line



// Make io available to routes
app.set('io', io);


// Error Middleware (Global)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
