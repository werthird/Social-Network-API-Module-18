const router = require('express').Router();

const { 
  getThoughts,
  getSingleThought 
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;