"use client";

import { RootState } from "@store/rootReducer";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { User } from "@widgets/User";
import { ActionButton } from "@ui/ActionButton";

const SettingsPage = () => {
  const router = useRouter();
  const { name, email } = useSelector((state: RootState) => state.user.user);

  const handleProfileClick = () => {
    console.log("click");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
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
          <ActionButton text="Account" />
        </li>
        <li>
          <ActionButton text="Appearance" />
        </li>
        <li>
          <ActionButton text="Notifications" />
        </li>
      </ul>

      <button className="m-8 text-red cursor-pointer" onClick={handleLogout}>
        Log Out
      </button>
    </main>
  );
};

export default SettingsPage;
