const express = require('express');
const router = express.Router();
const { fetchAllExpensesById, addNewExpense } = require('../controllers/expenseController')

router.get('/', fetchAllExpensesById);
router.post('/', addNewExpense);
// router.patch('/:expenseId', );
// router.delete('/:expenseId', );

module.exports = router;