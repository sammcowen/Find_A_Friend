const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of /users to routes created in 'user-routes'
router.use('/users', userRoutes);
// add prefix of /thoughts to routes created in 'thought-routes'
module.exports = router;
