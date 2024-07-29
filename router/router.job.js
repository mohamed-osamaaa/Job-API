const express = require('express');
const router = express.Router();
const controllerJob = require('../controlers/controllers.job');
const { validation } = require('../middelwares/validation');
const verifyToken = require('../middelwares/verifyToken');

router.route('/')
    .get(controllerJob.getAllJobs)
    .post(verifyToken, validation(), controllerJob.createJob);

router.route('/:id')
    .get(controllerJob.getJob)
    .patch(verifyToken, controllerJob.updataJob)
    .delete(verifyToken, controllerJob.deleteJob);

module.exports = router;
