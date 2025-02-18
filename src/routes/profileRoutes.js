const express = require('express');
const router = express.Router();
const { createUserProfile, findProfileByUserId } = require('../controllers/profileController')

router.post('/', createUserProfile);
router.get('/:user_id', findProfileByUserId);
// router.patch('/:user_id', );

module.exports = router;