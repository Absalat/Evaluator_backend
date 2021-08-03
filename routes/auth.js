const express = require('express');
const FacultySchema = require('../models/faculty');

const jwtCrtl = require('../helpers/jwt');

const { authenticateUser, is } = require('../middlewares/auth');
const { failure, success } = require('../helpers/response');
const { SUPER_ADMIN, FACULTY } = require('../constants/roles');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return failure(res, 'username and password are required');
    }

    try {
        const user = await FacultySchema.findByUsername(username);
        const bearerToken = await jwtCrtl.createToken({ userId: user._id }, process.env.ENCR_SECRET);

        return success(res, { token: bearerToken, user: user });
    } catch (err) {
        console.log(err);
        return failure(res, 'Invalid login');
    }
});

router.post('/signup', authenticateUser, is(SUPER_ADMIN), async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return failure(res, 'username and password required');
    }

    try {
        req.body.roles = [FACULTY];
        const newUser = await FacultySchema.create(req.body);

        return success(res, newUser);
    } catch (err) {
        return failure(res, 'Something went wrong');
    }
});

router.put('/profile', authenticateUser, async (req, res) => {
    const newProfile = req.body;

    try {
        newProfile.profile_filled = true;
        await req.user.updateProfile(newProfile);
        return success(res, req.user);
    } catch (err) {
        return failure(res, 'Something went wrong');
    }
});

router.patch('/change_password', authenticateUser, is(FACULTY), async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return failure(res, 'oldPassword and newPassword required');
    }

    if (oldPassword == newPassword) {
        return failure(res, 'please use a different password');
    }

    try {
        if (!req.user.isPasswordCorrect(oldPassword)) {
            return failure(res, 'oldPassword is incorrect');
        }

        req.user.password = newPassword;
        await req.user.save();

        return success(res, { message: 'password updated successfuly' });
    } catch (err) {
        return failure(res, err.message || "Something went wrong");
    }
});

module.exports = router;
