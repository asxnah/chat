import { Contact } from "@/shared/types/user";
import { ActionButton } from "@/shared/ui/ActionButton";
import { Toggler } from "@/shared/ui/Toggler";
import { User } from "@/widgets/User";

interface ContactPanelProps {
  id: string;
  user: Omit<Contact, "isOnline" | "id">;
  onClick: (id: string) => void;
}

export const ContactPanel = ({ id, user, onClick }: ContactPanelProps) => {
  return (
    <div className="grow flex flex-col gap-4 h-screen">
      <User
        id={id}
        isAccount
        name={user.name}
        email={user.email}
        onClick={() => onClick(id)}
      />

      <div>
        <ActionButton
          text="Write a message"
          destination={`/chats?userId=${id}`}
        />
        <Toggler content="Notifications" checked={false} onToggle={() => {}} />
      </div>
    </div>
  );
};
