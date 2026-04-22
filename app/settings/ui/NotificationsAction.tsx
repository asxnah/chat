import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { setNotifs } from "@store/slices/chats";

import { ActionButton } from "@ui/ActionButton";
import { Popup } from "@ui/Popup";
import { Toggler } from "@ui/Toggler";

export const NotificationsAction = () => {
  const dispatch = useDispatch();

  const notifs = useSelector((state: RootState) => state.chats.notifs);

  const [popupShown, setPopupShown] = useState(false);

  return (
    <>
      {/* кнопка контроля popup */}
      <ActionButton text="Notifications" onClick={() => setPopupShown(true)} />
      {/* popup */}
      {popupShown && (
        <Popup heading="Appearance" onClose={() => setPopupShown(false)}>
          <Toggler content="Promotional" checked={false} disabled />
          <Toggler
            content="All chats"
            checked={notifs}
            onToggle={() => dispatch(setNotifs(!notifs))}
          />
        </Popup>
      )}
    </>
  );
};
