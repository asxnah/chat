"use client";

import { ActionButton } from "@ui/ActionButton";
import { AppearanceAction } from "./ui/AppearanceAction";
import { NotificationsAction } from "./ui/NotificationsAction";
import { UserAction } from "./ui/UserAction";
import { LogoutAction } from "./ui/LogoutAction";

const SettingsPage = () => {
  return (
    <>
      <main>
        {/* профиль и ее popups */}
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
            {/* кнопка Appearance и ее popup */}
            <AppearanceAction />
          </li>
          <li>
            {/* кнопка Notifications и ее popup */}
            <NotificationsAction />
          </li>
        </ul>

        {/* кнопка logout и popup-подтверждение */}
        <LogoutAction />
      </main>
    </>
  );
};

export default SettingsPage;
