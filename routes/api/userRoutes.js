const router = require('express').Router();

const { 
  getUsers,
  getSingleUser,
  createUser,
  updateUserEmail,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userControllers');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUserEmail).delete(deleteUser);

router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;