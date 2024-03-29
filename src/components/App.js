import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { uuid } from "uuidv4"
import "./App.css"
import api from '../api/contacts'
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail"
import EditContact from "./EditContact";


function App() {
  const LOCAL_STORAGE_KEY="contacts"
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveData = async () => {
    const response = await api.get("/contacts")
    return response.data
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    
    setContacts([...contacts, response.data])

  }

  const deleteContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id
    })

    setContacts(newContactList)
  }

  const updateContactHandler = async(contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    setContacts(contacts.map((c) => {
      if(c.id===contact.id) return {...response.data}
      else return c
    }))
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList)
    } else {
      setSearchResults(contacts)
    }
  }

  useEffect(()=>{
    const getAllContacts = async () => {
      const allContacts = await retrieveData()
      if(allContacts) setContacts(allContacts)
    }

    getAllContacts()
     
  }, [])

  useEffect(()=>{
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
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
                contacts = {searchTerm.length < 1 ? contacts : searchResults}
                deleteContactHandler={deleteContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
                />
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
          path="/edit" 
          exact 
          render={(props) => (
            <EditContact 
              {...props}
              updateContactHandler = {updateContactHandler}
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
