import React, { useRef } from "react"
import { Link } from 'react-router-dom'
import ContactCard from "./ContactCard"

const ContactList = (props) => {
    
    const inputElement = useRef("")

    const deleteContactHandler = (id) => {
        props.deleteContactHandler(id)
    }
    
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard 
                contact={contact}
                clickHandler={deleteContactHandler}
                key={contact.id}    
            />
        )
    })

    const getSearchTerm = () => {
        props.searchKeyword(inputElement.current.value);
    }

    return (
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">ADD</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui fluid icon input">
                <input
                    ref={inputElement}
                    type="text"
                    placeholder="Search contacts..."
                    className="prompt"
                    value={props.term}
                    onChange={getSearchTerm}
                />
                <i className="search icon"></i>
                </div>
            </div>
            <div className="ui divided items">
            {renderContactList.length > 0
            ? renderContactList
            : "No Contacts available"}
            </div>
           
        </div>
    )
}

export default ContactList