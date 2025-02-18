const express = require('express');
const app = express();
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes')


const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// API routes
app.use('/profiles', profileRoutes);
// app.use('/reviews', );
// app.use('/coworking_spaces', );

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});