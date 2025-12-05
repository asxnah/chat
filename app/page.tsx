"use client";

import { useState } from "react";

import { Button } from "@/ui/Button";
import { Confirm } from "@/ui/Confirm";
import { Input } from "@/ui/Input";
import { Toggler } from "@/ui/Toggler";
import { Form } from "@/widgets/Form";
import { Popup } from "@/widgets/Popup";
import { TabBar } from "./widgets/TabBar";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [popupShown, setPopupShown] = useState<boolean>(false);

  return (
    <>
      <TabBar />
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
          onChange={setValue}
        />
        <Toggler
          content="Toggler"
          checked={checked}
          onToggle={() => setChecked((prev) => !prev)}
        />
        <Form
          buttonText="Submit"
          onSubmit={(userInfo) => console.log(userInfo)}
        />
        <button
          className="underline my-4 cursor-pointer"
          onClick={() => setPopupShown(true)}
        >
          Click to open popup
        </button>
        {popupShown && (
          <Popup
            heading="Popup"
            children={<p>Hello, World!</p>}
            onClose={() => setPopupShown(false)}
          />
        )}
      </main>
    </>
  );
}
