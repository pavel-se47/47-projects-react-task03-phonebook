import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from 'components/GeneralContainer/generalContainer';
import PhonebookContacts from 'components/PhonebookContacts/PhonebookContacts';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+375 12 459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '+375 12 443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '+375 12 645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '+375 12 227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  filterResult = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  checkContactExists = (name, number) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert('Error! This contact already exists!');
      return;
    }
    this.createContact(name, number);
  };

  createContact = (name, number) => {
    this.setState(prevState => ({
      contacts: [
        {
          id: nanoid(),
          name,
          number,
        },
        ...prevState.contacts,
      ],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();

    const filteredContatcs = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Container>
        <PhonebookForm addCheckContactExists={this.checkContactExists} />
        <PhonebookContacts
          contacts={filteredContatcs}
          filter={this.state.filter}
          addFilterResult={this.filterResult}
          addDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
