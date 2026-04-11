"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@store/rootReducer";
import { updateUser } from "@store/slices/user";

import { User } from "@widgets/User";
import { ActionButton } from "@ui/ActionButton";
import { Confirm } from "@ui/Confirm";
import { Popup } from "@ui/Popup";
import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

interface FormData {
  name: string;
  email: string;
}

const SettingsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { name, email } = useSelector((state: RootState) => state.user.user);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: name,
    email: email,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const confirmLogout = () => {
    setShowConfirm(false);
    handleLogout();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(updateUser({ key: "name", value: formData.name }));
    dispatch(updateUser({ key: "email", value: formData.email }));

    setShowPopup(false);
  };

  return (
    <>
      <main>
        <User
          id={""}
          name={name}
          email={email}
          onClick={() => setShowPopup(true)}
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

      {showPopup && (
        <Popup heading="Profile edit" onClose={() => setShowPopup(false)}>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                id="name"
                placeholder="Name"
                value={formData.name}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, name: value }))
                }
              />
              <Input
                id="email"
                placeholder="Email"
                value={formData.email}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, email: value }))
                }
              />
            </div>
            <Button content="Save" type="submit" />
          </form>
        </Popup>
      )}

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
