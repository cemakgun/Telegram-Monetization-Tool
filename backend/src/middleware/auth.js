const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressRequireAuth({
  // Optional: Customize the error response
  onError: (err, req, res) => {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  },
});

module.exports = requireAuth;
