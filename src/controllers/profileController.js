const User = require('../models/profileModel');

// creates a user profile upon sign up
const createUserProfile = async (req, res) => {
    try {
        const { user_id, name } = req.body;
        
        const result = await User.createProfile({ user_id, name });
        const newProfile = result[0];

        res.status(201).json({ 
            message: 'User profile created successfully', 
            profile: {
                name: newProfile.name,
            } 
        })
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

// Find a user profile by user Id
const findProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const result = await User.findByUserId(userId);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const profile = result[0];
        res.status(200).json(profile)
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createUserProfile, findProfileByUserId };