const express = require('express');
const router = express.Router();
const { 
    fetchAllExpensesById, 
    addNewPersonalExpense, 
    addNewSharedExpense,
    updateExpense 
} = require('../controllers/expenseController');

router.get('/', fetchAllExpensesById);
router.post('/personal', addNewPersonalExpense);
router.post('/shared', addNewSharedExpense);
router.patch('/:expenseId', updateExpense);
// router.delete('/:expenseId', );

module.exports = router;