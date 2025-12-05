import { useState, type FormEvent } from "react";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";

interface UserInfo {
  name: string;
  email: string;
}

interface FormProps {
  buttonText: string;
  onSubmit: (userInfo: UserInfo) => void;
}

export const Form = ({ buttonText, onSubmit }: FormProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <div className="flex flex-col gap-4">
        <Input
          id="name"
          name="name"
          placeholder="Name"
          value={userInfo.name}
          onChange={(value) => setUserInfo({ ...userInfo, name: value })}
        />

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          value={userInfo.email}
          onChange={(value) => setUserInfo({ ...userInfo, email: value })}
        />
      </div>
      <Button type="submit" content={buttonText} />
    </form>
  );
};
