const appError = require('../utels/appError');
module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create('You do not have permission to perform this action', 403));
        }
        next();
    };
};
