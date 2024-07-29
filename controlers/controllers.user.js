const generateJWT = require("../utels/generateJWT");
const bcrypt = require('bcryptjs');
const User = require('../models/model.user');
const asyncWrapper = require('../middelwares/asyncWrapper');
const appError = require('../utels/appError');
const statusError = require('../utels/StatusError');

const getAllUsers = asyncWrapper(async (req, res) => {
    const data = await User.find();
    res.status(200).json({ status: statusError.SUCCESS, data: { data } });
});


const getUser = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const data = await User.findById(id);
    if (!data) {
        const error = appError.create('not found this user', 404, statusError.FAIL);
        return next(error);
    }
    res.status(404).json({ status: statusError.ERROR, data: { data } });
});

const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    if (password.length <= 8) {
        const error = appError.create('password must be more than 8 characters and numbers', 400, statusError.FAIL);
        return next(error);
    }
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        const error = appError.create('email is already exist', 400, statusError.FAIL);
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: role,
        avatar: req.file.filename
    });
    const token = await generateJWT({ id: newUser._id, role: newUser.role });
    newUser.token = token;
    await newUser.save();
    res.status(201).json({ status: statusError.SUCCESS, data: { newUser } });
});


const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        const error = appError.create('email and password are required', 400, statusError.FAIL);
        return next(error);
    }
    if (!email) {
        const error = appError.create('email is required', 400, statusError.FAIL);
        return next(error);
    }
    if (!password) {
        const error = appError.create('password is required', 400, statusError.FAIL);
        return next(error);
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = appError.create('not found this user', 404, statusError.FAIL);
        return next(error);
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        const token = await generateJWT({ id: user._id, role: user.role });
        res.status(200).json({ status: statusError.SUCCESS, data: { token } });
    } else {
        const error = appError.create('password is incorrect', 400, statusError.FAIL);
        return next(error);
    }
});


const deleteUser = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    await User.findOneAndDelete(id);
    res.status(200).json({ status: statusError.SUCCESS, data: { data: null } });
});


module.exports = {
    getAllUsers,
    getUser,
    register,
    login,
    deleteUser
};
