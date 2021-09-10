import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact , setCurrent , clearCurrent } from '../../actions/contactActions';

 const ContactItem = ({ contact , deleteContact , setCurrent , clearCurrent } ) => {

    const { _id , name , email , phone , type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    };

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name.charAt(0).toUpperCase() + name.slice(1) }{'  '}
                <span style={{float :"right"}}
                className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')
                }>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && ( <li>
                   <i className="fas fa-envelope-open"> </i>
                   {" "}
                   {email}
                </li>) }

                {phone && ( <li>
                   <i className="fas fa-phone"> </i>
                   {" "}
                   {phone}
                </li>) }
            </ul>
            <p>
                <button className = "btn btn-dark btn-sm" onClick={ () => setCurrent(contact) }> Edit </button>
                <button className = "btn btn-danger btn-sm" onClick={onDelete} > Delete </button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact : PropTypes.object.isRequired
};

export default connect(
    null,
    { deleteContact , setCurrent , clearCurrent }
)(ContactItem);