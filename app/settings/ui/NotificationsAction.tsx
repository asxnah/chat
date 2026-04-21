import { useState } from "react";

import { NotificationsTarget } from "../model/types";

import { ActionButton } from "@ui/ActionButton";
import { Popup } from "@ui/Popup";
import { Toggler } from "@ui/Toggler";

interface NotificationsActionProps {
  checkedPromo: boolean;
  checkedChats: boolean;
  onToggle: (target: NotificationsTarget) => void;
}

export const NotificationsAction = ({
  checkedPromo,
  checkedChats,
  onToggle,
}: NotificationsActionProps) => {
  const [popupShown, setPopupShown] = useState(false);

  return (
    <>
      {/* кнопка контроля popup */}
      <ActionButton text="Notifications" onClick={() => setPopupShown(true)} />
      {/* popup */}
      {popupShown && (
        <Popup heading="Appearance" onClose={() => setPopupShown(false)}>
          <Toggler
            content="Promotional"
            checked={checkedPromo}
            onToggle={() => onToggle("promo")}
          />
          <Toggler
            content="All chats"
            checked={checkedChats}
            onToggle={() => onToggle("chats")}
          />
        </Popup>
      )}
    </>
  );
};
