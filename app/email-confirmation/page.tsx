"use client";

import { FormEvent, useState, KeyboardEvent, useEffect } from "react";
import Link from "next/link";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { redirect } from "next/navigation";

const emailConfirmation = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [isCorrect, setIsCorrect] = useState(true);

  const storageEmail = localStorage.getItem("email") || "your email";

  useEffect(() => {
    if (code.every((c) => c !== "") && code.join("") !== "1111") {
      setIsCorrect(false);
    }

    if (code.join("") === "1111") redirect("/chats");
  }, [code]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.querySelector(
        `#code-${index + 1}`
      ) as HTMLInputElement | null;

      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }

      const prevInput = document.querySelector(
        `#code-${index - 1}`
      ) as HTMLInputElement;

      if (prevInput) prevInput.focus();
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(code));
  };

  return (
    <main className="flex items-center justify-center">
      <form className="w-128 flex flex-col gap-8" onSubmit={onSubmit}>
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold text-center">
            Confrirm your email
          </h1>
          <p className="text-darkgrey text-center">
            The code was sent to {storageEmail}.{" "}
            <Link className="underline" href="/signup">
              Change email
            </Link>
          </p>
        </header>
        <div className="flex justify-center gap-4">
          {code.map((c, index) => (
            <Input
              key={index}
              className="w-11.5 h-11.5 text-center"
              id={`code-${index}`}
              placeholder="_"
              autoComplete="email"
              maxLength={1}
              value={c}
              onChange={(value) => handleChange(value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}
        </div>
        {!isCorrect && <p className="text-red text-center">Incorrect code</p>}
        <Button
          type="submit"
          content="Sign up"
          disabled={code.some((c) => c === "")}
        />
      </form>
    </main>
  );
};

export default emailConfirmation;
