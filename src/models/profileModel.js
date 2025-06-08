const User = {
    createProfile: async (profileData, supabase) => {
        const { data, error } = await supabase
            .from('profiles')
            .insert(profileData)
            .select();

        if(error) {
            throw new Error(error.message);
        }

        return data;
    },

    findByUserId: async (userId, supabase) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            return null;
        }

        return data;
    }
};

module.exports = User;