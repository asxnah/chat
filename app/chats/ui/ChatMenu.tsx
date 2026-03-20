import { Bug, CircleUserRound, EllipsisVertical, Image } from "lucide-react";
import { useState } from "react";

export const ChatMenu = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-99">
      <div className="relative">
        <button
          className="rounded-full bg-fill grid place-items-center w-10 h-10"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <EllipsisVertical className="stroke-black" />
        </button>

        {menuOpened && (
          <ul className="absolute z-99 right-10 w-50 rounded-xl border border-stroke bg-white">
            <li>
              <button className="py-3 px-4 flex items-center gap-3">
                <CircleUserRound
                  size={18}
                  strokeWidth={1.2}
                  className="stroke-darkgrey"
                />
                User 1
              </button>
            </li>
            <li>
              <button className="py-3 px-4 flex items-center gap-3">
                <Image
                  size={18}
                  strokeWidth={1.2}
                  className="stroke-darkgrey"
                />
                Change wallpaper
              </button>
            </li>
            <li>
              <button className="py-3 px-4 flex items-center gap-3">
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
