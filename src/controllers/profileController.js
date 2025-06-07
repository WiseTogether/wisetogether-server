const User = require('../models/profileModel');

// creates a user profile upon sign up
const createUserProfile = async (req, res) => {
    try {
        const { userId, email, name } = req.body;
        
        if (!userId || !email || !name) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        await User.createProfile({ 'user_id': userId, email, name }, req.supabase);
        res.status(201).json({ message: 'User profile created successfully'});
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

// Find a user profile by user Id
const findProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const result = await User.findByUserId(userId, req.supabase);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const profile = result[0];
        res.status(200).json(profile);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUserProfile, findProfileByUserId };