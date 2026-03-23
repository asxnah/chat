"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

import { contacts as data } from "./mocks.json";
const CONTACTS: Contact[] = data;

const ContactsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("userId");

  /**
   * Contact previews list (Redux state)
   */
  const contacts = useSelector(
    (state: RootState) => state.contacts.contacts || [],
  );

  /**
   * Local state: search query
   */
  const [query, setQuery] = useState<string>("");

  /**
   * Local state: currently selected user
   */
  const [user, setUser] = useState<Omit<Contact, "isOnline" | "id"> | null>(
    null,
  );

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

  useEffect(() => {
    if (id && contacts.length > 0) {
      selectContact(id);
    }
  }, [id, contacts]);

  /**
   * Memoized filtered contacts based on search query
   */
  const sortedContacts = useMemo<Contact[]>(() => {
    if (!query) return contacts;

    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [contacts, query]);

  /**
   * Handles contact selection
   */
  const selectContact = (id: string) => {
    setCurrentContactId(id);

    const currentContact = contacts.find((contact) => contact.id === id);

    if (currentContact) {
      setUser({
        name: currentContact.name,
        email: currentContact.email,
      });
    }

    router.replace(`?userId=${id}`);
  };

  return (
    <main className="flex">
      {/* Left panel: search + contacts list */}
      <div className="w-120 shrink-0 border-r border-r-stroke">
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
                onClick={selectContact}
                isSelected={currentContactId === contact.id}
                isOnline={contact.isOnline}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: current contact */}
      {user ? (
        <ContactPanel
          id={currentContactId}
          user={user}
          onClick={selectContact}
        />
      ) : (
        <p className="w-full text-center text-darkgrey mt-auto mb-8">
          Select a chat or a contact to start messaging
        </p>
      )}
    </main>
  );
};

export default ContactsPage;
