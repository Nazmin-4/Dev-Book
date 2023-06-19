const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../utils/auth');

const router = express.Router();

router.get('/dashboard',protect,dashboardController.getDashboard);
router.post('/posts',protect, dashboardController.createPost);

module.exports = router;
