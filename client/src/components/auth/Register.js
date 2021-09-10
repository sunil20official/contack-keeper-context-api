import React , { useState ,  useEffect  } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import {register , clearErrors } from '../../actions/authActions';

 const Register = ( { props , auth : {isAuthenticated , error } , setAlert , register , clearErrors} ) => {

     useEffect(() => {
         if(isAuthenticated) {
             props.history.push('/');
         }

         if(error === 'User already exists') {
             setAlert(error,'danger');
             clearErrors();
         }
         // eslint-disable-next-line
     }, [error , isAuthenticated ] );

    const [user , setUser] = useState({
        name : "",
        email : "",
        password : "",
        password2 : ""
    });

    const { name , email , password , password2 } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password ==='') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
           register({
               name,
               email,
               password
           });
        }
       
    }

    return (
        <div className = "form-container" >
            <h1>
                Account <span className="text-primary" > Register </span>
            </h1>
            <form onSubmit= {onSubmit} >
                <div className="form-group" > 
                   <label htmlFor="name" > Name </label>
                   <input 
                   type="text" 
                   name="name" 
                   value={name} 
                   onChange={onChange} 
                   required />
                </div>
                <div className="form-group" > 
                   <label htmlFor="email" > Email Address </label>
                   <input 
                   type="email" 
                   name="email" 
                   value={email} 
                   onChange={onChange} 
                   required />
                </div>
                <div className="form-group" > 
                   <label htmlFor="password" > Password </label>
                   <input 
                   type="password" 
                   name="password" 
                   value={password} 
                   onChange={onChange} 
                   minLength="6"
                   required />
                </div>
                <div className="form-group" > 
                   <label htmlFor="password2" > Confirm Password </label>
                   <input 
                   type="password" 
                   name="password2" 
                   value={password2} 
                   onChange={onChange} 
                   minLength="6"
                   required />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
            
        </div>
    )
}

Register.propTypes = {
    auth : PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(
    mapStateToProps,
    { setAlert , register , clearErrors }
   )(Register);
