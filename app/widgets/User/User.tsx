import type { MouseEvent } from "react";
import { ChevronRight } from "lucide-react";

type UserProps = {
  type: "contact" | "account";
  name: string;
  avatar: string;
  email?: string;
  selected?: boolean;
  onClick: (e: MouseEvent) => void;
};

export const User = ({
  type,
  name,
  avatar,
  email,
  selected = false,
  onClick,
}: UserProps) => {
  return (
    <div
      className={`user-info p-3 transition duration-200 cursor-pointer 
    ${selected ? "bg-[var(--fill)]" : ""}`}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="flex items-center gap-4">
        {avatar && (
          <img
            src={avatar}
            alt="user avatar"
            className="w-[3.375rem] h-[3.375rem] rounded-full object-cover"
          />
        )}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-4">
            <h4 className="font-normal">{name}</h4>
          </div>
          {email && <p className="text-[var(--darkgrey)]">{email}</p>}
        </div>
      </div>
      <ChevronRight className="width-[10px] height-[16px]" />
    </div>
  );
};
