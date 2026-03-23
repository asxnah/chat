import { Bug, CircleUserRound, EllipsisVertical, Image } from "lucide-react";

interface ChatMenuProps {
  name: string;
  menuShown: boolean;
  onClick: (action: "user" | "bg" | "bug" | "menu") => void;
}

export const ChatMenu = ({ name, menuShown, onClick }: ChatMenuProps) => {
  return (
    <div className="absolute top-4 right-4 z-99">
      <div className="relative">
        <button
          className="rounded-full bg-fill grid place-items-center w-10 h-10"
          onClick={() => onClick("menu")}
        >
          <EllipsisVertical className="stroke-black" />
        </button>

        {menuShown && (
          <ul className="absolute z-99 right-10 w-50 rounded-xl border border-stroke bg-white">
            <li>
              <button
                className="py-3 px-4 flex items-center gap-3"
                onClick={() => onClick("user")}
              >
                <CircleUserRound
                  size={18}
                  strokeWidth={1.2}
                  className="stroke-darkgrey"
                />
                {name}
              </button>
            </li>
            <li>
              <button
                className="py-3 px-4 flex items-center gap-3"
                onClick={() => onClick("bg")}
              >
                <Image
                  size={18}
                  strokeWidth={1.2}
                  className="stroke-darkgrey"
                />
                Change wallpaper
              </button>
            </li>
            <li>
              <button
                className="py-3 px-4 flex items-center gap-3"
                onClick={() => onClick("bug")}
              >
                <Bug size={18} strokeWidth={1.2} className="stroke-darkgrey" />
                Report a bug
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
