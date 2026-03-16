"use client";

import { useEffect, useMemo, useState } from "react";

import { Contact } from "@/shared/types/user";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store";
import { setContacts } from "@/store/slices/contacts";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { User } from "@/widgets/User";
import { UserPlus } from "lucide-react";
import { ContactPanel } from "./ui/ContactPanel";

const CONTACTS: Contact[] = [
  {
    id: "f3o9n476tf7ow98ae",
    name: "User-1",
    email: "example@email.com",
    isOnline: true,
  },
  {
    id: "qf89nty75rclemd",
    name: "User-2",
    email: "email@example.com",
    isOnline: false,
  },
];

const ContactsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Chat previews list (Redux state)
   */
  const contacts = useSelector(
    (state: RootState) => state.contacts.contacts || [],
  );

  /**
   * Local state: search query
   */
  const [query, setQuery] = useState<string>("");

  /**
   * Local state: currently selected contact ID
   */
  const [currentContactId, setCurrentContactId] = useState<string>("");

  /**
   * On mount:
   * - Simulates API request
   * - Stores contacts list in Redux
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setContacts(CONTACTS));
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Memoized filtered contacts based on search query
   */
  const sortedContacts = useMemo<Contact[]>(() => {
    if (!query) return contacts;

    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [contacts, query]);

  return (
    <main className="flex">
      {/* Left panel: search + contacts list */}
      <div className="w-120 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          {/* Search input + add contact button */}
          <div className="flex gap-4 mx-8 my-3">
            <Button content={<UserPlus className="stroke-white" />} />
            <Input
              classExtension="w-full"
              id="search"
              placeholder="Search"
              value={query}
              onValueChange={setQuery}
            />
          </div>

          {/* Contacts list */}
          <div>
            {sortedContacts.map((contact) => (
              <User
                key={contact.id}
                id={contact.id}
                isAccount={false}
                name={contact.name}
                email={contact.email}
                onClick={setCurrentContactId}
                isSelected={currentContactId === contact.id}
                isOnline={contact.isOnline}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: current contact */}
      <ContactPanel id={currentContactId} />
    </main>
  );
};

export default ContactsPage;
