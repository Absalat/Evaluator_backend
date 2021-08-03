const express = require('express');
const { FacultySelfEvaluationModel } = require('../models');

const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

router.post('/faculty_evaluation', authenticateUser, (req, res) => {
    res.end('reached');
});

module.exports = router;
