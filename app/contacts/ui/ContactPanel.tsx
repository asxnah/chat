import { Contact } from "@/shared/types/user";
import { ActionButton } from "@/shared/ui/ActionButton";
import { Toggler } from "@/shared/ui/Toggler";
import { User } from "@/widgets/User";

interface ContactPanelProps {
  id: string;
}

const USER: Contact = {
  id: '',
  name: '',
  email: '',
  onClick: '',
}

export const ContactPanel = ({
  id,
}: ContactPanelProps) => {
  return (
    <div className="flex flex-col gap-4">
      <User id={id} isAccount name={USER.name} email={USER.email} onClick={USER.onClick} />

      <div>
        <ActionButton
          text="Write a message"
          destination={`/chats?userId=${id}`}
        />
        <Toggler content='Notifications' checked= onToggle= />
      </div>
    </div>
  );
};
