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

    findByUserId: async (userId, supabase) => {
        const { data, error } = await supabase
            .from('shared_accounts')
            .select('uuid, user1_id, user2_id, unique_code')
            .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

        if (error) {
            return null;
        }

        if (data && data.length > 0) {
            return data.map((sharedAccount) => ({
                uuid: sharedAccount.uuid,
                user1Id: sharedAccount.user1_id,
                user2Id: sharedAccount.user2_id,
                uniqueCode: sharedAccount.unique_code,
            }));
        }

        return data;
    }
}

module.exports = SharedAccount;