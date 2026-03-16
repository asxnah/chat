import { ChevronRight } from "lucide-react";

type UserProps = {
  id: string;
  isAccount: boolean;
  name: string;
  email: string;
  onClick: (id: string) => void;
  isSelected?: boolean;
  isOnline?: boolean;
};

export const User = ({
  id,
  isAccount,
  name,
  email,
  onClick,
  isSelected,
  isOnline,
}: UserProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      className={`flex items-center justify-between py-3 px-8 cursor-pointer ${isSelected ? "bg-fill" : "bg-white"}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`shrink-0 rounded-full grid place-items-center bg-lightgrey ${
            isAccount ? "w-16 h-16" : "w-13.5 h-13.5"
          } ${isOnline ? "relative" : ""}`}
        >
          <p className="text-2xl font-bold text-white">
            {name[0] ? name[0].toUpperCase() : "U"}
          </p>
          {isOnline && (
            <div className="absolute z-99 bottom-0 right-0 w-2 h-2 bg-black rounded-full"></div>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-4">
            <h4 className="font-normal">{name}</h4>
          </div>
          <p className="text-darkgrey">{email}</p>
        </div>
      </div>

      <ChevronRight className="width-2.5 height-4 stroke-lightgrey" />
    </div>
  );
};
