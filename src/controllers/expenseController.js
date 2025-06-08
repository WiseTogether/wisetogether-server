const Expense = require('../models/expenseModel');

// Fetch all expenses by user id or shared account id
const fetchAllExpensesById = async (req, res) => {
    try {
        const { userId, sharedAccountId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const personalExpenses = await Expense.filterById(userId, 'user', req.supabase);
        let sharedExpenses = [];

        if (sharedAccountId) {
            sharedExpenses = await Expense.filterById(sharedAccountId, 'sharedAccount', req.supabase);
        }

        if (!personalExpenses || !sharedExpenses) {
            return res.status(404).json({ message: 'No expenses found for the specified user or shared account' });
        }

        const allExpenses = [...personalExpenses, ...sharedExpenses];

        if (allExpenses.length === 0) {
            return res.status(200).json(allExpenses);
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

const addNewPersonalExpense = async (req, res) => {
    const { userId, date, amount, category, description } = req.body;

    if (!userId || !date || !amount || !category) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    let newExpense = { 'user_id': userId, date, amount, category };

    if (description) {
        newExpense.description = description;
    }

    try {
        const createdExpense = await Expense.addExpense(newExpense, req.supabase);
        res.status(201).json(createdExpense);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const addNewSharedExpense = async (req, res) => {
    const { sharedAccountId, userId, date, amount, category, description, splitType, splitDetails } = req.body;

    if (!sharedAccountId || !userId || !date || !amount || !category || !splitType) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    let newExpense = { 
        'user_id': userId, 
        'shared_account_id': sharedAccountId, 
        date, 
        amount, 
        category, 
        'split_type': splitType 
    };
    
    if (description) {
        newExpense.description = description;
    }
    
    if (splitType === 'equal') {
        newExpense.split_details = {
            user1_amount: Math.round(0.50 * amount),
            user2_amount: Math.round(0.50 * amount)
        };
    }

    if (splitType === 'percentage' && splitDetails) {
        const { user1, user2 } = splitDetails;
        newExpense.split_details = {
            user1_amount: Math.round((user1 / 100) * amount),
            user2_amount: Math.round((user2 / 100) * amount)
        };
    }

    try {
        const createdExpense = await Expense.addExpense(newExpense, req.supabase);
        res.status(201).json(createdExpense);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const { date, amount, category, description, splitType, splitDetails } = req.body;

        if (!expenseId) {
            return res.status(400).json({ error: 'Expense ID is required' });
        }

        // Build update object with only provided fields
        const updatedData = {};
        if (date) updatedData.date = date;
        if (amount) updatedData.amount = amount;
        if (category) updatedData.category = category;
        if (description) updatedData.description = description;
        if (splitType) updatedData.split_type = splitType;

        // Handle split details if amount or split type changes
        if (splitType === 'equal' && amount) {
            updatedData.split_details = {
                user1_amount: Math.round(0.50 * amount),
                user2_amount: Math.round(0.50 * amount)
            };
        } else if (splitType === 'percentage' && splitDetails && amount) {
            const { user1, user2 } = splitDetails;
            updatedData.split_details = {
                user1_amount: Math.round((user1 / 100) * amount),
                user2_amount: Math.round((user2 / 100) * amount)
            };
        }

        const updatedExpense = await Expense.updateExpense(expenseId, updatedData, req.supabase);

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(updatedExpense);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchAllExpensesById, addNewPersonalExpense, addNewSharedExpense, updateExpense };