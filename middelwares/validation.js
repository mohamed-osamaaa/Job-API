const { body } = require("express-validator");
const validation = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage("title is required")
            .isLength({ min: 2 })
            .withMessage("title at least is 2 digits"),
        body('salary')
            .notEmpty()
            .withMessage("salary is required")
            .isLength({ min: 4 })
            .withMessage("salary at least is 4 digits"),
        body('workHours')
            .notEmpty()
            .withMessage("workHours is required"),
    ]
};
module.exports = { validation };
