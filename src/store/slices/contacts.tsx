import { Contact } from "@/shared/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactsData {
  contacts: Contact[];
}

const initialState: ContactsData = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "chatsPreview",
  initialState,
  reducers: {
    setContacts: (state: ContactsData, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    addContact: (state: ContactsData, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
  },
});

// Экспортируем action
export const { setContacts, addContact } = contactsSlice.actions;
// Экспортируем редьюсер по умолчанию
export default contactsSlice.reducer;
