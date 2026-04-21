import { useState } from "react";

import { ActionButton } from "@ui/ActionButton";
import { Popup } from "@ui/Popup";
import { Toggler } from "@ui/Toggler";
import { Input } from "@ui/Input";

import { CircleIcon } from "./icons/CircleIcon";
import { Button } from "@ui/Button";

export const AppearanceAction = () => {
  const [popupShown, setPopupShown] = useState(false);
  const [currentColor, setCurrentColor] = useState("#312F2C");
  const [isDarkThemed, setDarkThemed] = useState(false);

  const setColor = (color: string) => {
    console.log(color);
  };

  const handleSet = () => {
    setPopupShown(false);
    setColor(currentColor);
  };

  return (
    <>
      {/* кнопка контроля popup */}
      <ActionButton text="Appearance" onClick={() => setPopupShown(true)} />
      {/* popup */}
      {popupShown && (
        <Popup heading="Appearance" onClose={() => setPopupShown(false)}>
          <div className="grid gap-6">
            <Toggler
              content="Dark theme"
              checked={isDarkThemed}
              onToggle={() => setDarkThemed((prev) => !prev)}
            />
            <div className="flex items-center justify-between">
              <p>Accent color</p>
              <div className="px-3 py-2 rounded-2xl bg-fill flex items-center gap-1.5 transition-colors duration-200 border border-fill focus-within:border-lightgrey">
                <CircleIcon fill={currentColor} />
                <Input
                  id="theme-color"
                  placeholder="#312F2C"
                  value={currentColor}
                  onValueChange={setCurrentColor}
                  type="text"
                  className="!p-0 focus-visible:!border-transparent w-16 font-mono text-center"
                />
              </div>
            </div>
            <Button className="mt-5" content="Set" onClick={handleSet} />
          </div>
        </Popup>
      )}
    </>
  );
};
