var express = require('express');
var router = express.Router();

router.post('/faculty_evaluation', (req, res) => res.end('reached'));

module.exports = router;
