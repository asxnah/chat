import { Contact } from "@shared-types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactsData {
  contacts: Contact[];
}

const initialState: ContactsData = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state: ContactsData, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    addContact: (state: ContactsData, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    updateContact: (
      state,
      action: PayloadAction<{
        contactId: string;
        key: keyof Contact;
        value: string;
      }>,
    ) => {
      const { contactId, key, value } = action.payload;
      const contact = state.contacts.find(
        (contact) => contact.id === contactId,
      );
      if (contact) {
        (contact[key] as Contact[keyof Contact]) = value;
      }
    },
  },
});

export const { setContacts, addContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
