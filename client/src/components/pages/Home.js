import React , { useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/authActions';
import { connect } from 'react-redux';

 const Home = ( { loadUser } ) => {

     useEffect(() => {
         loadUser();
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
    { loadUser }
    )(Home);
