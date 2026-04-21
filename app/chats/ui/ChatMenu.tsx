import { Bug, CircleUserRound, EllipsisVertical, Image as ImageIcon } from "lucide-react";

/**
 * Props for the ChatMenu component.
 */
interface ChatMenuProps {
  /** Display name of the current user */
  name: string;

  /** Flag indicating whether the menu dropdown is visible */
  menuShown: boolean;

  /**
   * Callback triggered when a menu action is clicked.
   *
   * @param action - Type of action selected:
   *                 'user' (navigate to user profile),
   *                 'bg' (change wallpaper),
   *                 'bug' (report a bug),
   *                 'menu' (toggle menu visibility)
   */
  onClick: (action: "user" | "bg" | "bug" | "menu") => void;
}

/**
 * ChatMenu component
 *
 * Responsible for:
 * - Displaying a menu button in the top-right corner of the chat panel
 * - Showing menu options when toggled:
 *   - Navigate to user profile
 *   - Change chat wallpaper
 *   - Report a bug
 */
export const ChatMenu = ({ name, menuShown, onClick }: ChatMenuProps) => {
  return (
    <div className="absolute top-4 right-4 z-99">
      <div className="relative">
        {/* Menu toggle button */}
        <button
          className="rounded-full bg-fill grid place-items-center w-10 h-10"
          onClick={() => onClick("menu")}
        >
          <EllipsisVertical className="stroke-black" />
        </button>

        {/* Dropdown menu */}
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
                <ImageIcon
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
