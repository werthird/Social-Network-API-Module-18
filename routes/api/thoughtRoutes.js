const router = require('express').Router();

const { 
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

module.exports = router;