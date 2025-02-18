const { supabase } = require('../supabaseClient')

const SharedAccount = {

    createAccount: async (accountData) => {
        const { data, error } = await supabase
            .from('shared_accounts')
            .insert(accountData)
            .select()

        if(error) {
            console.error('Error inserting shared account into Supabase')
            throw new Error(error.message);
        }

        return data;
    },

    updateAccountByInviteCode: async(inviteCode, updatedData) => {
        const { error } = await supabase
            .from('shared_accounts')
            .update(updatedData)
            .eq('unique_code', inviteCode)
        
        if(error) {
            throw new Error(error.message);
        }
    },

    findByUserId: async (userId) => {
        const { data, error } = await supabase
            .from('shared_accounts')
            .select('*')
            .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

        if (error) {
            console.error('Error fetching shared account:', error);
            return null;
        }

        return data;
    }
}

module.exports = SharedAccount;