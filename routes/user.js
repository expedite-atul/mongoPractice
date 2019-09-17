const express = require('express');
const { create, get, login, protect } = require('./../controllers/user');

/**
* routes only without params or query string
*/
const router = express.Router();

router.post('/user', create);
router.get('/user', protect, get);
router.post('/user/login', login);


module.exports = router;



