const express = require('express');
const router = express.Router();
const {addUserController, getUserController, getUserByUsernameController, updateUserController,deleteUserController} = require('../controller/UserController');

router.post('/user', addUserController);
router.get('/user', getUserController);
router.get('/user/:username', getUserByUsernameController)
router.put('/user/:username', updateUserController);
router.delete('/user/:username', deleteUserController)
module.exports = router;