const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  removeThought,
  postReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createNewThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reactions').post(postReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

