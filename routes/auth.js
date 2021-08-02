var express = require('express');
var router = express.Router();

router.post('/signup', (req, res) => res.end('reached'));
router.post('/login', (req, res) => res.end('reached'));
router.put('/profile', (req, res) => res.end('reached'));
router.patch('/change_password', (req, res) => res.end('reached'));

module.exports = router;
