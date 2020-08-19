import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm'
import Filter from './Filter/Filter'
import ContactList from './ContactList/ContactList'
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {
    state = {
      contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
      ],
      filter: ''
    }
    componentDidMount() {
      const persistedContacts = localStorage.getItem('contacts');


      persistedContacts && this.setState({contacts:JSON.parse(persistedContacts)})
    }
    componentDidUpdate (prevProps, prevState) {
      if(prevState.contacts !== this.state.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    }
    addContact = (name, number) => {
      const contact = {
        id: uuidv4(),
        name,
        number
      };
      this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, contact],
          };
      });
    };
  
    getVisibleTasks = () => {
      const { contacts, filter } = this.state;
  
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
      );
    };
    handleFilter = e => {
      this.setState({ filter: e.target.value });
    }
    removeContact = contactId => {
      this.setState(prevState => {
        return {
          contacts: prevState.contacts.filter(({ id }) => id !== contactId),
        };
      });
    };
    render() {
      const visibleContacts = this.getVisibleTasks();
 
        return (
            <div>
                <h1>Phonebook</h1>
                <ContactForm 
                  onAddContact={this.addContact}
                  contacts={this.state.contacts}
                />
                <h2>Contacts</h2>
                <Filter onHandleFilter={this.handleFilter} />
                <ContactList 
                  visibleContacts={visibleContacts}
                  onRemove={this.removeContact}/>
            </div>
      );
    }
  }