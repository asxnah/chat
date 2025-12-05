"use client";

import { useEffect, useState } from "react";

import { Button } from "@/ui/Button";
import { Confirm } from "@/ui/Confirm";
import { Input } from "@/ui/Input";
import { Toggler } from "@/ui/Toggler";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <main className="p-4 flex flex-col gap-2">
      <Button content="Test" onClick={() => console.log("Click")} />

      <div className="w-full p-4 bg-neutral-200">
        <Confirm
          content="Confirm?"
          submit={() => console.log("Submitted")}
          onDecline={() => console.log("Declined")}
        />
      </div>

      <Input
        id="example"
        placeholder="Example"
        value={value}
        change={setValue}
      />

      <Toggler
        content="Toggler"
        checked={checked}
        onToggle={() => setChecked((prev) => !prev)}
      />
    </main>
  );
}
