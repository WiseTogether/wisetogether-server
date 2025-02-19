const { supabase } = require('../supabaseClient')

const Expense = {

    // Filter expenses by user id or shared account id
    filterById: async (id, idType) => {

        const columnName = idType === 'user' ? 'user_id' : 'shared_account_id' 

        const { data, error } = await supabase
            .from('expenses')
            .select('shared_account_id, date, amount, category, description, split_type, split_details')
            .eq(columnName, id)
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching expenses:', error);
            return null;
        }

        if (data.length > 0) {
            return data.map((expense) => ({
                sharedAccountId: expense.shared_account_id,
                userId: expense.user_id,
                date: expense.date,
                amount: expense.amount,
                category: expense.category,
                description: expense.description,
                splitType: expense.split_type,
                splitDetails: expense.splitDetails,
            }))
        }

        return data;
    },

    addExpense: async (expense) => {
        const { data, error } = await supabase
            .from('expenses')
            .insert(expense)

        if(error) {
            throw new Error(error.message);
        }

        return data;
    }
    
}

module.exports = Expense;