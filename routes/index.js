const express = require('express');
const {
    FacultySelfEvaluationModel,
    ChairSelfEvaluationModel,
    SchoolSelfEvaluationModel,
} = require('../models');

const { authenticateUser, is } = require('../middlewares/auth');
const { failure, success } = require('../helpers/response');
const { FACULTY, DEAN, CHAIR } = require('../constants/roles');

const router = express.Router();

router.post('/faculty', authenticateUser, is(FACULTY), async (req, res) => {
    try {
        req.body.user = req.user._id;
        const evaluation = await FacultySelfEvaluationModel.create(req.body);
        return success(res, evaluation);
    } catch (err) {
        return failure(res, err);
    }
});

router.post('/chair', authenticateUser, is(CHAIR), async (req, res) => {
    try {
        req.body.user = req.user._id;
        const evaluation = await ChairSelfEvaluationModel.create(req.body);
        return success(res, evaluation);
    } catch (err) {
        return failure(res, err);
    }
});

router.post('/school', authenticateUser, is(DEAN), async (req, res) => {
    try {
        req.body.user = req.user._id;
        const evaluation = await SchoolSelfEvaluationModel.create(req.body);
        return success(res, evaluation);
    } catch (err) {
        return failure(res, err);
    }
});

module.exports = router;
