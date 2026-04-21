"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Confirm } from "@ui/Confirm";
import { useState } from "react";

const DeleteAccountPage = () => {
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAccount = () => {
    setShowConfirm(true);
  };

  const confirmDeleteAccount = () => {
    localStorage.removeItem("token");
    router.push("/signup");
  };

  return (
    <>
      <main className="relative h-full overflow-y-auto p-8 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <button
            className="h-full w-auto cursor-pointer"
            onClick={() => router.push("/settings")}
          >
            <ChevronLeft className="h-full w-auto" />
          </button>
          <h1 className="font-medium text-2xl">Account</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold">Warning:</span> This action cannot be
            undone.
          </p>
          <small className="text-darkgrey">
            Deleting your account will erase all data, including chats. This
            process is irreversible - once deleted, no information can be
            recovered or saved. Your account will be{" "}
            <span className="font-bold">permanently removed in 30 days</span>.
            If you proceed, all data will be lost.
          </small>
        </div>
        <button
          className="text-left text-red cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete my account anyway
        </button>
      </main>
      {showConfirm && (
        <Confirm
          content="Delete account permanently?"
          onDecline={() => setShowConfirm(false)}
          onSubmit={confirmDeleteAccount}
        />
      )}
    </>
  );
};

export default DeleteAccountPage;
