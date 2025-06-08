const express = require('express');
const router = express.Router();
const { 
    fetchAllExpensesById, 
    addNewPersonalExpense, 
    addNewSharedExpense,
    updateExpense,
    deleteExpense 
} = require('../controllers/expenseController');

router.get('/', fetchAllExpensesById);
router.post('/personal', addNewPersonalExpense);
router.post('/shared', addNewSharedExpense);
router.patch('/:expenseId', updateExpense);
router.delete('/:expenseId', deleteExpense);

module.exports = router;