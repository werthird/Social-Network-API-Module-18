const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Catch-all route - could be refactored to be a redirect to a 404 page
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;