import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContact , updateContact , clearCurrent } from '../../actions/contactActions';


 const ContactForm = ( {addContact, updateContact , clearCurrent , current } ) => {

    useEffect(() => {
        if(current !== null) {
            setContact(current);
        } else {
            setContact({
                name:"",
                email:"",
                phone:"",
                type:"personal"
            });
        }
    }, [ current] );

    const [contact , setContact] = useState({
        name:"",
        email:"",
        phone:"",
        type:"personal"
    });

    const { name , email , phone , type } = contact;

    const onChange = e => 
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        } else {
            updateContact(contact);
        }
        
        setContact({
            name:"",
            email:"",
            phone:"",
            type:"personal"
        });
    }

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit = {onSubmit} >
            <h2 className="text-primary"> { current ? 'Edit Contact' : 'Add Contact'} </h2>
            <input 
                type="text" 
                placeholder="Name" 
                name="name" 
                value={name} 
                onChange={onChange} />

            <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={email} 
                onChange={onChange} />

            <input 
                type="text" 
                placeholder="Phone" 
                name="phone" 
                value={phone} 
                onChange={onChange} />
            <h5> Contact Type </h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} />
            Personal{' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} />
            Professional
            <div>
                <input 
                type="submit" 
                value= { current ? 'Update Contact' : 'Add Contact'} 
                className="btn btn-primary btn-block" />
            </div>
            {current &&( <div>
                <button className="btn btn-light btn-block" onClick={clearAll} >
                    Clear
                </button>

                </div>)
            }

        </form>
    )
}

ContactForm.propTypes = {
    current: PropTypes.object.isRequired,
    addContact: PropTypes.func.isRequired,
    updateContact: PropTypes.func.isRequired,
    clearCurrent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    current: state.contact.current
})

export default connect(
    mapStateToProps,
    { addContact , updateContact , clearCurrent }
    )(ContactForm);