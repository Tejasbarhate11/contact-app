import React from "react"
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
        <div className="ui divided items">
            {renderList}
        </div>
    )
}

export default ContactList