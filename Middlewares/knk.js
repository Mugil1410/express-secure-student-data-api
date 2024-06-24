const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'User data not found' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyToken;