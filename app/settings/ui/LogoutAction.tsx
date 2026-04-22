import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClearSession } from "../lib/useClearSession";
import { Confirm } from "@ui/Confirm";

export const LogoutAction = () => {
  const router = useRouter();
  const clear = useClearSession();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    clear();
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
