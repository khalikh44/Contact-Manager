import React,{ useState , useEffect} from 'react';
import { v4 as uuid } from 'uuid';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts,{id: uuid(),...contact} ]);
  };
  const deleteContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }
  useEffect(()=>{
    const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrievedContacts)setContacts(retrievedContacts);
  },[])
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts])
  return (
    <div className="ui container">
      <Header />
      <AddContact  addContactHandler={addContactHandler}/>
      <ContactList  contacts={contacts} getContactId={deleteContactHandler}/>
    </div>
  );
}

export default App;
