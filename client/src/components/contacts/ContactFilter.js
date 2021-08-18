import React , { useContext , useRef , useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

 const ContactFilter = () => {
     const contactContext = useContext(ContactContext);
     const text = useRef('');

     const { clearFilter , filterContacts , filtered } = contactContext;

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

export default ContactFilter 
