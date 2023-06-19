const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  const payload = { userId };
  const secretKey = 'your-secret-key'; // Replace with your own secret key
  const options = { expiresIn: '1h' }; // Token expiration time

  return jwt.sign(payload, secretKey, options);
};

// Protect route middleware
const protect = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const secretKey = 'your-secret-key'; // Replace with your own secret key
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user ID to the request object
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, protect };
