"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

const LoginPage = () => {
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
        <h1 className="text-4xl font-semibold text-center">Welcome back</h1>
        <div className="flex flex-col gap-4">
          <Input
            id="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />
          <Input
            id="Password"
            placeholder="Password"
            type="current-password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
          />
        </div>
        <Button
          type="submit"
          content="Log in"
          disabled={formData.email === "" || formData.password === ""}
        />
        <Link className="text-center underline" href="/signup">
          Don&rsquo;t have an account yet?
        </Link>
      </form>
    </main>
  );
};

export default LoginPage;
