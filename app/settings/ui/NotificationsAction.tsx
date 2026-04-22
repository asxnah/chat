import { useState } from "react";

import { ActionButton } from "@ui/ActionButton";
import { Popup } from "@ui/Popup";
import { Toggler } from "@ui/Toggler";

export type NotificationsTarget = "promo" | "chats";

export const NotificationsAction = () => {
  const [popupShown, setPopupShown] = useState(false);
  const [promoNotifs, togglePromoNotifs] = useState(false);
  const [notifs, toggleNotifs] = useState(true);

  const handleToggleNotifs = (target: NotificationsTarget) => {
    if (target === "promo") togglePromoNotifs((prev) => !prev);
    if (target === "chats") toggleNotifs((prev) => !prev);
  };

  return (
    <>
      {/* кнопка контроля popup */}
      <ActionButton text="Notifications" onClick={() => setPopupShown(true)} />
      {/* popup */}
      {popupShown && (
        <Popup heading="Appearance" onClose={() => setPopupShown(false)}>
          <Toggler
            content="Promotional"
            checked={promoNotifs}
            onToggle={() => handleToggleNotifs("promo")}
          />
          <Toggler
            content="All chats"
            checked={notifs}
            onToggle={() => handleToggleNotifs("chats")}
          />
        </Popup>
      )}
    </>
  );
};
