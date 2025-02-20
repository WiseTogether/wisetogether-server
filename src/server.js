const express = require('express');
const app = express();
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const sharedAccountRoutes = require('./routes/sharedAccountRoutes');
const expenseRoutes = require('./routes/expenseRoutes')


const PORT = process.env.PORT;

app.use(express.json());

const corsOptions = {
    origin: 'https://wisetogether.onrender.com',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
    credentials: false,
  };
  
app.use(cors(corsOptions));

// API routes
app.use('/profiles', profileRoutes);
app.use('/shared-accounts', sharedAccountRoutes);
app.use('/expenses', expenseRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});