const express = require('express');
const router = express.Router();
//we need no longer to do app.post or app.get after assigning router

// @route       GET api/contacts
// @desc        get the all contacts of a specific user
// @access      private
router.get('/', (req , res) => {
    res.send('get contacts of specific user');
});

// @route       POST api/contacts
// @desc        create contacts
// @access      private
router.post('/', (req , res) => {
    res.send('Add a contact');
});


//put and delete will contain id which is a placeholder for the contact which we want to update or delete

// @route       PUT api/contacts
// @desc        update a contact
// @access      private
router.put('/:id', (req , res) => {
    res.send('update a contact');
});

// @route       DELETE api/contacts
// @desc        delete a contact
// @access      private
router.delete('/:id', (req , res) => {
    res.send('delete a contact');
});

module.exports = router;