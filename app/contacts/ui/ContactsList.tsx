import { Contact } from "@shared-types/user";
import { User } from "@widgets/User";

interface ContactsListProps {
  sortedContacts: Contact[];
  onSelect: (id: string) => void;
  selectedContactId: string;
  onCreate: () => void;
}

export const ContactsList = ({
  sortedContacts,
  onSelect,
  selectedContactId,
  onCreate,
}: ContactsListProps) => {
  if (sortedContacts.length !== 0) {
    <div>
      {sortedContacts.map((contact) => (
        <User
          key={contact.id}
          id={contact.id}
          isAccount={false}
          name={contact.name}
          email={contact.email}
          onClick={onSelect}
          isSelected={selectedContactId === contact.id}
          isOnline={contact.isOnline}
        />
      ))}
    </div>;
  }

  if (sortedContacts.length === 0) {
    return (
      <div className="mx-8 mt-3 h-full flex flex-col items-center justify-center gap-1">
        <p className="text-darkgrey">You don&#39;t have contacts yet</p>
        <button className="cursor-pointer text-darkgrey underline" onClick={onCreate}>
          Create your first contact
        </button>
      </div>
    );
  }
};
