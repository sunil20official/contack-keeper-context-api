import React , {Fragment} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { clearContacts } from '../../actions/contactActions';

const Navbar = ({ title , icon , auth:{ isAuthenticated , user } , logout , clearContacts }) => {

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authlinks = (
        <Fragment>
            <li> Hello { user && user.name }</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm" > Logout </span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to = '/register' > Register </Link>
            </li>
            <li>
                <Link to = '/login' > Login </Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title} 
            </h1>
            <ul>
                {isAuthenticated ? authlinks : guestLinks}
            </ul>

        </div>
    )
}

Navbar.propTypes = {
  title:PropTypes.string.isRequired,
  icon:PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title:"Contact Keeper",
    icon:"fas fa-id-card-alt"
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logout , clearContacts }
     )(Navbar);