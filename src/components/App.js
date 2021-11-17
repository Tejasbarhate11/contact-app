import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { uuid } from "uuidv4"
import "./App.css"
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail"


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
      <Router>
        <Header />
        <Switch>
          <Route 
            path="/" 
            exact 
            render={(props) =>(
              <ContactList 
                {...props}  
                contacts = {contacts} 
                deleteContactHandler={deleteContactHandler}/>
            )} 
          />

          <Route 
          path="/add" 
          exact 
          render={(props) => (
            <AddContact 
              {...props}
              addContactHandler = {addContactHandler}
            />)} 
          />

          <Route
            path="/contact/:id"
            component={ContactDetail}
          />
        </Switch>
      </Router>
      
    </div>
  )
}

export default App
