import React , {Fragment , useEffect } from 'react';
import {CSSTransition , TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getContacts } from '../../actions/contactActions';

 const Contacts = ( {contact: {contacts , filtered , loading } , getContacts }) => {

     useEffect(() => {
         getContacts();
         // eslint-disable-next-line
     }, []);

     if(contacts !== null && contacts.length === 0 && !loading) {
         return <h4> Please add a Contact </h4>
     }

    return (
        <Fragment>
            {contacts !== null && !loading ? 
            ( <TransitionGroup>
            { filtered !== null ? filtered.map(contact => ( 
               <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem  contact ={contact} />
                </CSSTransition>
              ) ) 
            :
            contacts.map(contact => (
               <CSSTransition  key={contact._id} timeout={500} classNames="item" >
                <ContactItem contact = {contact} />
               </CSSTransition>
             ))
            }
            </TransitionGroup>)
             : 
             <Spinner /> }
           
        </Fragment>
    )
}

Contacts.propTypes = {
    contact: PropTypes.object.isRequired,
    getContacts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(
    mapStateToProps,
    { getContacts }
      )(Contacts);