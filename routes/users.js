const express = require('express');
const { FacultyModel } = require('../models');

const { authenticateUser, is } = require('../middlewares/auth');
const { failure, success } = require('../helpers/response');
const { SUPER_ADMIN, FACULTY } = require('../constants/roles');

const router = express.Router();

router.get('/', authenticateUser, is(SUPER_ADMIN), async (req, res) => {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const username = req.query.username || false;

    try {
        const query = {};

        if (username) {
            query.username = new RegExp("^" + username);
        }

        const allUsersCount = await FacultyModel.countDocuments(query);
        const users = await FacultyModel.find(query).skip(start).limit(limit).exec();
        return success(res, { users, totalUsers: allUsersCount });
    } catch (err) {
        return failure(res, err.message || "Something went wrong");
    }
});

router.patch('/:userId/roles', authenticateUser, is(SUPER_ADMIN), async (req, res) => {
    const { roles } = req.body;
    const { userId } = req.params;

    if (!roles) {
        return failure(res, "roles fields required");
    }

    try {
        const faculty = await FacultyModel.findById(userId);
        faculty.roles = roles;

        const savedFaculty = await faculty.save();
        return success(res, savedFaculty);
    } catch (err) {
        return failure(res, err.message || "Something went wrong");
    }
});

module.exports = router;