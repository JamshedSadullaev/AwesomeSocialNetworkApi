const router = require("express").Router();
const {
    getAllThought,
    getSingleThoughts,
    createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

router.route("/").get(getAllThought).post(createThought);
router
  .route("/:thoughtId")
  .get(getSingleThoughts)
  .put(updateThought)
  .delete(deleteThought);
router.route("/:thoughtId/reaction").post(addReaction);
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;