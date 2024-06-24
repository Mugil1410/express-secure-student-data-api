// authMiddleware.js
const isAuthenticated=(req, res, next)=>{
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('You are not authenticated');
    }
}

module.exports = isAuthenticated;