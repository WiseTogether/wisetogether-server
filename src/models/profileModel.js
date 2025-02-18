const { supabase } = require('../supabaseClient')

const User = {

    // Inserts new user data to Supabase
    createProfile: async (userData) => {
        const { data, error } = await supabase
            .from('profiles')
            .insert(userData)
            .select()

        if(error) {
            throw new Error(error.message);
        }

        return data;
    },

    findByUserId: async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }

        return data;
    }
}

module.exports = User;