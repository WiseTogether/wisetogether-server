const Expense = {

    // Filter expenses by user id or shared account id
    filterById: async (id, idType, supabase) => {
        const columnName = idType === 'user' ? 'user_id' : 'shared_account_id' 

        const { data, error } = await supabase
            .from('expenses')
            .select('uuid, shared_account_id, user_id, date, amount, category, description, split_type, split_details')
            .eq(columnName, id)
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching expenses:', error);
            return null;
        }

        if (data.length > 0) {
            return data.map((expense) => ({
                id: expense.uuid,
                sharedAccountId: expense.shared_account_id,
                userId: expense.user_id,
                date: expense.date,
                amount: expense.amount,
                category: expense.category,
                description: expense.description,
                splitType: expense.split_type,
                splitDetails: expense.split_details,
            }))
        }
        
        return data;
    },

    addExpense: async (expense, supabase) => {
        const { data, error } = await supabase
            .from('expenses')
            .insert(expense)
            .select();

        if(error) {
            throw new Error(error.message);
        }

        return data;
    }
    
}

module.exports = Expense;