const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/UserController');
const checkAuth = require('../utils/checkAuth');

router.post('/register', register);
router.post('/login', login);

router.get('/me', checkAuth, getMe);

module.exports = router;