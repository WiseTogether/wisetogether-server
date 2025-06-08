const express = require('express');
const app = express();
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const sharedAccountRoutes = require('./routes/sharedAccountRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 8080;

app.use(express.json());

const corsOptions = {
    origin: ['https://wisetogether.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
app.use(cors(corsOptions));

// API routes with auth middleware
app.use('/profiles', verifyToken, profileRoutes);
app.use('/shared-accounts', verifyToken, sharedAccountRoutes);
app.use('/expenses', verifyToken, expenseRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});