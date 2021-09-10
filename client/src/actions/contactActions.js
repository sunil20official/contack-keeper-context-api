import axios from 'axios';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    SET_LOADING,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from './types';

// Get Contacts from the database
export const getContacts = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/contacts');
        dispatch({
            type: GET_CONTACTS ,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CONTACT_ERROR ,
            payload: err.response.msg
        });
    }
}

//Add a contact to the database
export const addContact = (contact) => async (dispatch) => {
    const config = {
        header:{
            'Content-Type' : 'application/json'
        }
    }

    try {
        const res = await axios.post('http://localhost:5000/api/contacts' , contact , config);
        dispatch({
            type:ADD_CONTACT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg
        });
    }
}

//Delete a Contact
export const deleteContact = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg
        });
    }
}

//set current 
export const setCurrent = (contact) => {
    return {
        type: SET_CURRENT,
        payload: contact
    };
};

//Update a contact 
export const updateContact = (contact) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.put(`http://localhost:5000/api/contacts/${contact._id}`, contact , config);

        dispatch({
            type: UPDATE_CONTACT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg
        });
    }
}

export const clearContacts = () => {
    return {
        type: CLEAR_CONTACTS
    };
};

//Clear Current Contact
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    };
};



//Filter Contacts
export const filterContacts = text => dispatch => {
    dispatch({ type: FILTER_CONTACTS, payload : text
     });
}

//Clear Filter
export const clearFilter = () => {
    return { 
        type: CLEAR_FILTER
     };
};

//SetLoading
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};