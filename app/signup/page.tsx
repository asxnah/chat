"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

const SignupPage = () => {
  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
  };

  return (
    <main className="flex items-center justify-center">
      <form className="w-128 flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-4xl font-semibold text-center">Welcome</h1>
        <div className="flex flex-col gap-4">
          <Input
            id="Name"
            placeholder="Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
          />
          <Input
            id="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(value) => {
              setFormData({ ...formData, email: value });
              localStorage.setItem("email", value);
            }}
          />
          <Input
            id="Password"
            placeholder="Password"
            type="new-password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
          />
        </div>
        <Button
          type="submit"
          content="Continue"
          disabled={
            formData.name === "" ||
            formData.email === "" ||
            formData.password === ""
          }
        />
        <Link className="text-center underline" href="/login">
          Already have an account?
        </Link>
      </form>
    </main>
  );
};

export default SignupPage;
