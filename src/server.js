const express = require('express');
const app = express();
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const sharedAccountRoutes = require('./routes/sharedAccountRoutes');


const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// API routes
app.use('/profiles', profileRoutes);
app.use('/shared-accounts', sharedAccountRoutes);
// app.use('/coworking_spaces', );

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});