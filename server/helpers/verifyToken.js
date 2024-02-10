const jwt = require('jsonwebtoken');
module.exports = function verifyToken(req, res, next) {

    const token = req.cookies['jwt'];
    if (!token) return res.status(401).send({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded.userId;
        next();
    }catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};