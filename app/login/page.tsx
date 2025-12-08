"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { update } from "@/store/slices/userData";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [formData, setFormData] = useState<Omit<UserInfo, "name">>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      email: userInfo.data.email,
    });
  }, []);

  const handleFormChange = (key: keyof UserInfo, value: string) => {
    setFormData({ ...formData, [key]: value });

    if (key === "email") dispatch(update({ key, value }));
  };

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
            onChange={(value) => handleFormChange("email", value)}
          />
          <Input
            id="Password"
            placeholder="Password"
            type="current-password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(value) => handleFormChange("password", value)}
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
