const jwt = require('jsonwebtoken');
const appError = require('../utels/appError');
const statusError = require('../utels/StatusError');

const verifyToken = (req, res, next) => {
    const authheader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authheader) {
        const error = appError.create('token is required', 401, statusError.ERROR);
        return next(error);
    }
    const token = authheader.split(' ')[1];
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();
    } catch (err) {
        const error = appError.create('token is invalid', 401, statusError.ERROR);
        return next(error);
    }
};
module.exports = verifyToken;
