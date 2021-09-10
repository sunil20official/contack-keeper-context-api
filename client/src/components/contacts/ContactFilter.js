import React , { useRef , useEffect } from 'react'
import { connect } from 'react-redux';
import { filterContacts , clearFilter } from '../../actions/contactActions';
import PropTypes from 'prop-types';


 const ContactFilter = ({ filtered , filterContacts , clearFilter}) => {
     
     const text = useRef('');

     

     useEffect( () => {
         if(filtered === null) {
             text.current.value = '';
         }
     } );

    const onChange = (e) => {
        if(text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <div>
            <input ref={text} type="text" placeholder="Filter Contacts ..." onChange={onChange} />
        </div>
    )
}

ContactFilter.propTypes = {
    filtered: PropTypes.object.isRequired,
    filterContacts: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    filtered: state.contact.filtered
})

export default connect(
    mapStateToProps,
    { filterContacts , clearFilter}
    )(ContactFilter);
