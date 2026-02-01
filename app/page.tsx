"use client";

import { useState } from "react";

import { Button } from "@ui/Button";
import { Confirm } from "@ui/Confirm";
import { Input } from "@ui/Input";
import { Toggler } from "@ui/Toggler";
import { Form } from "@ui/Form";
import { Popup } from "@ui/Popup";
import { User } from "@widgets/User";

export default function Home() {
  // Состояние для значения Input
  const [value, setValue] = useState<string>("");
  // Состояние для Toggler
  const [checked, setChecked] = useState<boolean>(false);
  // Состояние для отображения Popup
  const [popupShown, setPopupShown] = useState<boolean>(false);

  return (
    <main className="p-4 flex flex-col gap-2 overflow-scroll h-screen">
      {/* Две кнопки: обычная и отключенная */}
      <div className="grid grid-cols-[auto_auto] gap-2">
        <Button content="Test" onClick={() => console.log("Click")} />
        <Button content="Test" onClick={() => console.log("Click")} disabled />
      </div>

      {/* Компонент Confirm с обработчиками подтверждения и отказа */}
      <div className="w-full p-4 bg-neutral-200">
        <Confirm
          content="Confirm?"
          submit={() => console.log("Submitted")}
          onDecline={() => console.log("Declined")}
        />
      </div>

      {/* Input с управляемым состоянием value */}
      <Input
        id="example"
        placeholder="Example"
        value={value}
        onChange={setValue}
      />

      {/* Toggler с переключением состояния checked */}
      <div className="w-full border-y border-y-lightgrey">
        <Toggler
          content="Toggler"
          checked={checked}
          onToggle={() => setChecked((prev) => !prev)}
        />
      </div>

      {/* Form с кнопкой и обработкой submit */}
      <div className="w-full p-4 border-b border-b-lightgrey">
        <Form
          buttonText="Submit"
          onSubmit={(userInfo) => console.log(userInfo)}
        />
      </div>

      {/* Кнопка для открытия Popup */}
      <button
        className="w-full border-b border-b-lightgrey underline py-4 cursor-pointer"
        onClick={() => setPopupShown(true)}
      >
        Click to open popup
      </button>

      {/* Отображение Popup, если popupShown = true */}
      {popupShown && (
        <Popup
          heading="Popup"
          children={<p>Hello, World!</p>}
          onClose={() => setPopupShown(false)}
        />
      )}

      {/* Список пользователей (account и contact) с обработкой onClick */}
      <div className="w-full border-b border-b-lightgrey py-4">
        <User
          type="account"
          name="Example account"
          email="example@email.com"
          avatar="https://i.pinimg.com/736x/90/2a/c5/902ac5d9530185d81b4f3f91b9fd7c17.jpg"
          onClick={() => console.log("User account")}
        />
        <User
          type="contact"
          name="Example contact"
          email="example@email.com"
          avatar="https://i.pinimg.com/736x/3e/a8/f1/3ea8f18e9888280073e6627bd6c12969.jpg"
          onClick={() => console.log("User contact")}
        />
      </div>
    </main>
  );
}
