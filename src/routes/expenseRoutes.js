const express = require('express');
const router = express.Router();
const { fetchAllExpensesById } = require('../controllers/expenseController')

router.get('/', fetchAllExpensesById);
// router.post('/', );
// router.patch('/:expenseId', );
// router.delete('/:expenseId', );

module.exports = router;