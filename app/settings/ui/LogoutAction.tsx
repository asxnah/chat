import { useState } from "react";
import { useRouter } from "next/navigation";
import { Confirm } from "@ui/Confirm";

export const LogoutAction = () => {
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);

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
      {/* управление logout popup */}
      <button
        className="m-8 text-red cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        Log Out
      </button>

      {/* popup */}
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
