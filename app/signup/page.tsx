"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { update } from "@/store/slices/userData";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

const SignupPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [formData, setFormData] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData(userInfo.data);
  }, []);

  const handleFormChange = (key: keyof UserInfo, value: string) => {
    setFormData({ ...formData, [key]: value });

    if (key !== "password") dispatch(update({ key, value }));
  };

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
            onChange={(value) => handleFormChange("name", value)}
          />
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
            type="new-password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(value) => handleFormChange("password", value)}
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
