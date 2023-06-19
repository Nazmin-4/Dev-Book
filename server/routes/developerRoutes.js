const express = require('express');
const developerController = require('../controllers/developerController');
const { protect } = require('../utils/auth');

const router = express.Router();

router.post('/register',developerController.registerDeveloper);
router.post('/login', developerController.loginDeveloper);

module.exports = router;
