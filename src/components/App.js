import React, { useState, useEffect } from "react"
import { uuid } from "uuidv4"
import "./App.css"
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"


function App() {
  const LOCAL_STORAGE_KEY="contacts"
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([{ id: uuid(), ...contact}, ...contacts])
  }

  const deleteContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id
    })

    setContacts(newContactList)
  }

  useEffect(()=>{
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(retrievedData) setContacts(retrievedData)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler = {addContactHandler}/>
      <ContactList contacts = {contacts} deleteContactHandler={deleteContactHandler}/>
    </div>
  )
}

export default App
