import React , { useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import { getContacts } from '../../actions/contactActions';

 const Home = ( { loadUser , getContacts } ) => {

     useEffect(() => {
         loadUser();
         getContacts();
         //eslint-disable-next-line
     } , []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
           
        </div>
    );
};

Home.propTypes = {
    loadUser : PropTypes.func.isRequired
}

export default connect(
    null,
    { loadUser , getContacts }
    )(Home);
