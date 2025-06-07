const { getSupabaseClientWithAuth } = require('../supabaseClient');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const supabase = getSupabaseClientWithAuth(token);
    
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    req.supabase = supabase;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during token verification' });
  }
};

module.exports = { verifyToken }; 