"use client";

import { useState } from "react";
import { RootState } from "@store/rootReducer";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { User } from "@widgets/User";
import { ActionButton } from "@ui/ActionButton";
import { Confirm } from "@ui/Confirm";

const SettingsPage = () => {
  const router = useRouter();

  const { name, email } = useSelector((state: RootState) => state.user.user);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleProfileClick = () => {
    console.log("click");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const confirmLogout = () => {
    setShowConfirm(false);
    handleLogout();
  };

  return (
    <>
      <main>
        <User
          id={""}
          name={name}
          email={email}
          onClick={handleProfileClick}
          isAccount
        />
        <ul>
          <li>
            <ActionButton
              text="Account"
              destination="/settings/delete-account"
            />
          </li>
          <li>
            <ActionButton text="Appearance" />
          </li>
          <li>
            <ActionButton text="Notifications" />
          </li>
        </ul>
        <button
          className="m-8 text-red cursor-pointer"
          onClick={() => setShowConfirm(true)}
        >
          Log Out
        </button>
      </main>
      {showConfirm && (
        <Confirm
          content="Log out?"
          onDecline={() => setShowConfirm(false)}
          onSubmit={confirmLogout}
        />
      )}
    </>
  );
};

export default SettingsPage;
