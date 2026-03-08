const express = require('express');
const { saveProject , getProjects } = require('../controllers/projectController');

const router = express.Router();

router.post('/save', saveProject);

router.get('/get', getProjects)


module.exports = router;
