const FacultySchema = require('../models/faculty');
const jwt = require('../helpers/jwt');
const _ = require('lodash');
const { failure } = require('../helpers/response');

const middleware = {};

middleware.authenticateUser = async (req, res, next) => {
    const secret = process.env.ENCR_SECRET;
    const authorization = req.headers['authorization'];

    if (!_.isString(authorization)) {
        return failure(res, 'unauthorized', 401);
    }

    try {
        const [__, token] = authorization.trim().split(' ');
        const decodedToken = await jwt.verifyToken(token, secret);
        const { userId } = decodedToken;

        const faculty = await FacultySchema.findById(userId);
        req.user = faculty;
        next();
    } catch (err) {
        failure(res, 'unauthorized', 401);
    }
}

middleware.is = (...roles) => (req, res, next) => {
    if (!req.user) return failure(res, 'unauthorized', 401);

    for (let role of roles) {
        if (req.user.roles.includes(role)) return next();
    }

    return failure(res, 'unauthorized', 403);
}

module.exports = middleware;