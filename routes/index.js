const express = require('express');
const {
    FacultySelfEvaluationModel,
    ChairSelfEvaluationModel,
    SchoolSelfEvaluationModel,
    FacultyModel,
} = require('../models');

const { authenticateUser, is } = require('../middlewares/auth');
const { failure, success } = require('../helpers/response');
const { FACULTY, DEAN, CHAIR, SUPER_ADMIN } = require('../constants/roles');

const router = express.Router();

const formSubmissionHandler = (Model) => {
    return async (req, res) => {
        try {
            req.body.user = req.user._id;
            const evaluation = await Model.create(req.body);
            return success(res, evaluation);
        } catch (err) {
            return failure(res, err);
        }
    }
}

const evaluationRetrievalHandler = (EvaluationModel) => {
    return async (req, res) => {
        const facultyUsername = req.query.username || false;
        const start = parseInt(req.query.start) || 0;
        const limit = parseInt(req.query.limit) || 10;

        try {
            let users = [];
            const hasUsername = Boolean(facultyUsername);

            if (hasUsername) {
                users = await FacultyModel.find({
                    username: new RegExp("^" + facultyUsername.toString().trim()),
                }).skip(start).limit(limit).exec();
            }

            const userIds = users.map((each) => each._id);
            const foundUsers = Boolean(userIds.length);

            if (hasUsername && !foundUsers) {
                return success(res, { evaluations: [], totalEvaluations: 0 })
            }

            const query = {};

            if (userIds.length) {
                query.user = { $in: userIds };
            }

            const totalEvaluations = await EvaluationModel.countDocuments(query);
            const evaluations = await EvaluationModel
                .find(query)
                .populate('user')
                .skip(start)
                .limit(limit)
                .exec();
            return success(res, { evaluations: evaluations, totalEvaluations: totalEvaluations });
        } catch (err) {
            return failure(res, err);
        }
    }
}

const currentUserEvauationRetrievalHandler = async (req, res) => {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const role = req.query.role || FACULTY;

    let EvaluationModel = null;

    switch (role) {
        case FACULTY:
            EvaluationModel = FacultySelfEvaluationModel;
            break;
        case DEAN:
            EvaluationModel = SchoolSelfEvaluationModel;
            break;
        case CHAIR:
            EvaluationModel = ChairSelfEvaluationModel;
            break;
        default:
            break;
    }

    const modelDecided = EvaluationModel != null;

    if (!modelDecided) {
        return failure(res, "provide a valid role");
    }

    try {
        const query = { user: req.user._id };

        const totalEvaluations = await EvaluationModel.countDocuments(query);
        const evaluations = await EvaluationModel
            .find(query)
            .populate('user')
            .skip(start)
            .limit(limit)
            .exec();
        return success(res, { evaluations: evaluations, totalEvaluations: totalEvaluations });
    } catch (err) {
        return failure(res, err);
    }
}



router.get(
    '/',
    authenticateUser,
    is(FACULTY),
    currentUserEvauationRetrievalHandler,
)

router.get(
    '/faculty',
    authenticateUser,
    is(SUPER_ADMIN),
    evaluationRetrievalHandler(FacultySelfEvaluationModel));

router.get(
    '/chair',
    authenticateUser,
    is(SUPER_ADMIN),
    evaluationRetrievalHandler(ChairSelfEvaluationModel));

router.get(
    '/school',
    authenticateUser,
    is(SUPER_ADMIN),
    evaluationRetrievalHandler(SchoolSelfEvaluationModel));

router.post(
    '/faculty',
    authenticateUser,
    is(FACULTY),
    formSubmissionHandler(FacultySelfEvaluationModel));

router.post(
    '/chair',
    authenticateUser,
    is(CHAIR),
    formSubmissionHandler(ChairSelfEvaluationModel));

router.post(
    '/school',
    authenticateUser,
    is(DEAN),
    formSubmissionHandler(SchoolSelfEvaluationModel));

module.exports = router;
