const { validationResult } = require('express-validator');
const Job = require('../models/model.job');
const asyncWrapper = require('../middelwares/asyncWrapper');
const appError = require('../utels/appError');
const statusError = require('../utels/StatusError');


const getAllJobs = asyncWrapper(async (req, res) => {
    const data = await Job.find({}, { "__v": false });
    res.status(200).json({ status: statusError.SUCCESS, data: { data } });
});


const getJob = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const data = await Job.findById(id);
    if (!data) {
        const error = appError.create('not found this jop', 404, statusError.FAIL);
        return next(error);
    }
    res.status(404).json({ status: statusError.SUCCESS, data: { data } });
});


const createJob = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = appError.create(errors.array(), 400, statusError.FAIL);
        return next(error);
    }
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ status: statusError.SUCCESS, data: newJob });
});


const updataJob = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const updataJob = await Job.updateOne({ _id: id }, { $set: { ...req.body } });
    res.status(200).json({ status: statusError.SUCCESS, data: updataJob });
});


const deleteJob = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    await Job.deleteOne({ _id: id });
    res.status(200).json({ status: statusError.SUCCESS, data: null });
});


module.exports = { getAllJobs, getJob, createJob, updataJob, deleteJob };
