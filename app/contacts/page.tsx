"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Contact } from "@shared-types/user";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { AppDispatch } from "@store";
import { setContacts } from "@store/slices/contacts";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { User } from "@widgets/User";
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
   * Handles contact selection
   * - Updates selected contact state
   * - Updates URL search param `userId`
   * @param id Contact ID
   */
  const selectContact = useCallback(
    (id: string) => {
      router.replace(`?userId=${id}`);
    },
    [router],
  );

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
  }, [dispatch]);

  /**
   * Memoized filtered contacts based on search query
   * - Improves performance by recalculating only when `contacts` or `query` changes
   */
  const sortedContacts = useMemo<Contact[]>(() => {
    if (!query) return contacts;

    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [contacts, query]);

  /**
   * Derived state: currently selected contact ID
   */
  const currentContactId = id || "";

  /**
   * Derived state: currently selected user
   */
  const user = useMemo<Omit<Contact, "isOnline" | "id"> | null>(() => {
    if (!id || contacts.length === 0) return null;

    const currentContact = contacts.find((contact) => contact.id === id);

    if (!currentContact) return null;

    return {
      name: currentContact.name,
      email: currentContact.email,
    };
  }, [id, contacts]);

  /**
   * Renders the main contacts page layout
   * - Left panel: search + contacts list
   * - Right panel: current contact details
   */
  return (
    <main className="flex">
      {/* Left panel: search + contacts list */}
      <div className="w-120 shrink-0 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          {/* Search input + add contact button */}
          <div className="flex gap-4 mx-8 my-3">
            <Button content={<UserPlus className="stroke-white" />} />
            <Input
              className="w-full"
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
