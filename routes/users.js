const express = require('express');
const router = express.Router();
//we need no longer to do app.post or app.get after assigning router

// @route       POST api/users
// @desc        register a user
// @access      public
router.post('/', (req , res) => {
    res.send('Register a user');
});

module.exports = router;