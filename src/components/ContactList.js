import React from "react"
import { Link } from 'react-router-dom'
import ContactCard from "./ContactCard"

const ContactList = (props) => {
    
    const deleteContactHandler = (id) => {
        props.deleteContactHandler(id)
    }
    
    const renderList = props.contacts.map((contact) => {
        return (
            <ContactCard 
                contact={contact}
                clickHandler={deleteContactHandler}
                key={contact.id}    
            />
        )
    })
    return (
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">ADD</button>
                </Link>
            </h2>
            <div className="ui divided items">
                {renderList}
            </div>
           
        </div>
    )
}

export default ContactList