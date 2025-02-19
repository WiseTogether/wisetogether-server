const Expense = require('../models/expenseModel');

// Fetch all expenses by user id or shared account id
const fetchAllExpensesById = async (req, res) => {
    try {
        const { userId, sharedAccountId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const personalExpenses = await Expense.filterById(userId, 'user');
        let sharedExpenses = [];

        if (sharedAccountId) {
            sharedExpenses = await Expense.filterById(sharedAccountId, 'sharedAccount');
        }

        if (!personalExpenses || !sharedExpenses) {
            return res.status(404).json({ message: 'No expenses found for the sepcified user or shared account' });
        }

        const allExpenses = [...personalExpenses, ...sharedExpenses]

        if (allExpenses.length === 0) {
            return res.status(200).json(allExpenses)
        }

        // initialize an empty map to automatically handle uniqueness
        const map = new Map();

        // add each expense to the Map usinng expense.id as the key
        for (const expense of allExpenses) {
            map.set(expense.id, expense);
        }

        // convert the iterable of values into an array.
        const uniqueExpenses = Array.from(map.values());

        const sortedExpenses = uniqueExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(sortedExpenses)
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { fetchAllExpensesById };