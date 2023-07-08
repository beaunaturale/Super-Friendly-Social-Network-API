const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateExistingUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:userId').get(getSingleUser).put(updateExistingUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;