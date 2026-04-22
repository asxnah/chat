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
import { UserPlus } from "lucide-react";
import { ContactPanel } from "./ui/ContactPanel";
import { ContactsList } from "./ui/ContactsList";
import { Popup } from "@ui/Popup";

interface FormData {
  name: string;
  email: string;
}

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

  const [popupShown, setPopupShown] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

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
      dispatch(setContacts([]));
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

  const createContact = () => {
    setPopupShown(false);
  };

  /**
   * Renders the main contacts page layout
   * - Left panel: search + contacts list
   * - Right panel: current contact details
   */
  return (
    <main className="flex relative">
      {/* Left panel: search + contacts list */}
      <div className="w-120 shrink-0 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          {/* Search input + add contact button */}
          <div className="flex gap-4 mx-8 my-3">
            <Button content={<UserPlus className="stroke-white" />} />
            {sortedContacts.length !== 0 && (
              <Input
                className="w-full"
                id="search"
                placeholder="Search"
                value={query}
                onValueChange={setQuery}
              />
            )}
          </div>

          {/* Contacts list */}
          <ContactsList
            sortedContacts={sortedContacts}
            onSelect={selectContact}
            selectedContactId={currentContactId}
            onCreate={() => setPopupShown(true)}
          />
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
          Select a contact to see the details
        </p>
      )}

      {popupShown && (
        <Popup heading="New contact" onClose={() => setPopupShown(false)}>
          <div className="grid gap-8">
            <div className="flex flex-col gap-4">
              <Input
                id="name"
                placeholder="Name"
                value={formData.name}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: value,
                  }))
                }
              />
              <Input
                id="email"
                placeholder="email@example.com"
                value={formData.email}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: value,
                  }))
                }
              />
            </div>
            <Button content="Create" onClick={createContact} />
          </div>
        </Popup>
      )}
    </main>
  );
};

export default ContactsPage;
