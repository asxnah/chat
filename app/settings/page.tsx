"use client";

import { useState } from "react";

import { NotificationsTarget } from "./model/types";

import { ActionButton } from "@ui/ActionButton";
import { AppearanceAction } from "./ui/AppearanceAction";
import { NotificationsAction } from "./ui/NotificationsAction";
import { UserAction } from "./ui/UserAction";
import { LogoutAction } from "./ui/LogoutAction";

const SettingsPage = () => {
  const [isDarkThemed, setDarkThemed] = useState(false);
  const [promoNotificationsOn, setPromoNotificationsOn] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);

  const handleSaveInterfaceColor = (color: string) => {
    console.log(color);
  };

  const handleSetNotifications = (target: NotificationsTarget) => {
    if (target === "promo") setPromoNotificationsOn((prev) => !prev);
    if (target === "chats") setNotificationsOn((prev) => !prev);
  };

  return (
    <>
      <main>
        {/* профиль и popups редактирования */}
        <UserAction />

        {/* меню */}
        <ul className="px-8 py-6 grid gap-6">
          <li>
            <ActionButton
              text="Account"
              destination="/settings/delete-account"
            />
          </li>
          <li>
            <AppearanceAction
              checked={isDarkThemed}
              onToggle={() => setDarkThemed((prev) => !prev)}
              onSave={handleSaveInterfaceColor}
            />
          </li>
          <li>
            <NotificationsAction
              checkedPromo={promoNotificationsOn}
              checkedChats={notificationsOn}
              onToggle={handleSetNotifications}
            />
          </li>
        </ul>

        {/* кнопка logout и popup-подтверждение */}
        <LogoutAction />
      </main>
    </>
  );
};

export default SettingsPage;
