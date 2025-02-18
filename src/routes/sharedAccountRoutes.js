const express = require('express');
const router = express.Router();
const { createSharedAccount, addUserToSharedAccount, findSharedAccountByUserId } = require('../controllers/sharedAccountController')

router.post('/', createSharedAccount);
router.patch('/accept-invite', addUserToSharedAccount);
router.get('/:userId', findSharedAccountByUserId);

module.exports = router;