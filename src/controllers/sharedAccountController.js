const SharedAccount = require('../models/sharedAccountModel');

// creates a shared account when user 1 sends an invite link
const createSharedAccount = async (req, res) => {
    
    const { userId, uniqueCode } = req.body;
    if (!userId || !uniqueCode) {
        return res.status(400).json({ error: 'User ID or unique code is missing' });
    }

    try {
        await SharedAccount.createAccount({ 'user1_id': userId, 'unique_code': uniqueCode });
        res.status(201).json({ message: 'Shared account created successfully'})
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

// Adds user 2 to the shared account after registering via the invite link
const addUserToSharedAccount = async (req, res) => {
    try {
        const { code } = req.query;
        const { user2Id, timestamp } = req.body;

        if (!code || !user2Id || !timestamp) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        await SharedAccount.updateAccountByInviteCode(code, { 'user2_id': user2Id, 'updated_at': timestamp });
        res.status(200).json({ message: 'User added to the shared account successfully'})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Find a shared account by user Id
const findSharedAccountByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        
        const result = await SharedAccount.findByUserId(userId);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No shared account found for this user' });
        }

        const sharedAccount = result[0];
        res.status(200).json(sharedAccount)
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createSharedAccount, addUserToSharedAccount, findSharedAccountByUserId };