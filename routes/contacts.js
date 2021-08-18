const express = require('express');
const router = express.Router();
//we need no longer to do app.post or app.get after assigning router

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const { findByIdAndRemove } = require('../models/Contact');

// @route       GET api/contacts
// @desc        get the all contacts of a specific user
// @access      private
router.get('/', auth , async (req , res) => {
    try {
        const contacts = await Contact.find({ user : req.user.id }).sort({ date : -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/contacts
// @desc        add contacts
// @access      private
router.post('/', [ auth , [
    check('name' , 'Name is required').not().isEmpty()
]
] , 
    async (req , res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty())
            {
            return res.status(400).json({errors : errors.array()});
            }
            const { name , email , phone , type } = req.body;
            try {
                const newContact = new Contact ({
                    name,
                    email,
                    phone,
                    type,
                    user:req.user.id
                })
                const contact = await newContact.save();
                res.json(contact);
            } catch (err) {
                console.error(err.message);
                res.send(500).send('Server Error');
            }
        }
        );


//put and delete will contain id which is a placeholder for the contact which we want to update or delete

// @route       PUT api/contacts
// @desc        update a contact
// @access      private
router.put('/:id', auth , async (req , res) => {
    const { name , email , phone , type } = req.body;

    //Build Contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({ msg : "Contact Not found"});

        //make sure user own conatact
        if(contact.user.toString() !== req.user.id)
        {
            return res.status(401).json({ msg : "Not Authorized" });
        }
        contact = await Contact.findByIdAndUpdate(req.params.id , 
            {$set : contactFields },
            { new : true }
        );
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

// @route       DELETE api/contacts
// @desc        delete a contact
// @access      private
router.delete('/:id', auth , async (req , res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({ msg : "Contact Not found"});

        //make sure user own conatact
        if(contact.user.toString() !== req.user.id)
        {
            return res.status(401).json({ msg : "Not Authorized" });
        }
       
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg : "Contact deleted"});

    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

module.exports = router;