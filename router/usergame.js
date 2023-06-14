const express = require('express');
const router = express.Router();
const userGameController = require('../controllers/userGameController');

router.get('/userlist', userGameController.getUserList);
router.get('/userlist/add', userGameController.getAddUser);
router.post('/userlist/add', userGameController.addUser);
router.get('/userlist/update/:id', userGameController.getUpdateUser);
router.post('/userlist/update/:id', userGameController.updateUser);
router.get('/userlist/delete/:id', userGameController.deleteUser);
router.post('/userlist/delete/:id', userGameController.deleteUser);
router.get('/biodata', userGameController.getBiodata);
router.get('/biodata/add', userGameController.getAddBiodata);
router.post('/biodata/add', userGameController.addBiodata);
router.get('/biodata/update/:id', userGameController.getUpdateBiodata);
router.post('/biodata/update/:id', userGameController.updateBiodata);
router.get('/biodata/delete/:id', userGameController.deleteBiodata);

module.exports = router;
