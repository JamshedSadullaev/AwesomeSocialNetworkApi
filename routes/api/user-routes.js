const router = require("express").Router();
const {
  getUser,
  singleUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controller/userController");

router.route("/").get(getUser).post(newUser);
router.route("/:userId").get(singleUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friend/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;