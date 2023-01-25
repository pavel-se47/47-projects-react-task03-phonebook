import React from 'react';
import styles from './PhonebookContacts.module.css';

const PhonebookContacts = ({
  contacts,
  filter,
  addFilterResult,
  addDeleteContact,
}) => (
  <div className={styles.phonebookContacts}>
    <p className={styles.title}>Contacts</p>

    <div className={styles.border}>
      <label className={styles.label}>
        Enter name for search
        <input
          type="text"
          className={styles.input}
          name="filter"
          value={filter}
          placeholder="John Doe"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={addFilterResult}
        />
      </label>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className={styles.contactName}>
            {contact.name}: {contact.number}
            <button
              type="button"
              className={styles.button}
              onClick={() => addDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.subtitle}>Total contacts: {contacts.length}</p>
    </div>
  </div>
);

export default PhonebookContacts;
