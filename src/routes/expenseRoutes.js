const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
    fetchAllExpensesById, 
    addNewPersonalExpense, 
    addNewSharedExpense,
    updateExpense,
    deleteExpense,
    parseReceipt
} = require('../controllers/expenseController');

// Configure multer for memory storage
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router.get('/', fetchAllExpensesById);
router.post('/personal', addNewPersonalExpense);
router.post('/shared', addNewSharedExpense);
router.patch('/:expenseId', updateExpense);
router.delete('/:expenseId', deleteExpense);
router.post('/parse-receipt', upload.single('receipt'), parseReceipt);

module.exports = router;