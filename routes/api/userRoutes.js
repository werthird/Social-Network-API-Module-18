const router = require('express').Router();

const { 
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUserEmail
} = require('../../controllers/userControllers');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUserEmail).delete(deleteUser);


module.exports = router;