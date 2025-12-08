import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessagesSquare, Settings, Users } from "lucide-react";

export const TabBar = () => {
  const pathname = usePathname();
  if (pathname.includes("sign-up") || pathname.includes("sign-in")) return null;

  return (
    <aside className="h-full flex flex-col justify-between bg-black">
      <nav>
        <ul className="list-none">
          <li
            className={`${
              pathname === "/chats" ? "opacity-100" : "opacity-50"
            } p-4 transition-opacity duration-200`}
          >
            <Link
              href="/chats"
              className="w-full flex items-center flex-col gap-1"
            >
              <MessagesSquare className="stroke-white h-5" />
              <span className="text-white text-sm">Chats</span>
            </Link>
          </li>
          <li
            className={`${
              pathname === "/contacts" ? "opacity-100" : "opacity-50"
            } p-4 transition-opacity duration-200`}
          >
            <Link
              href="/contacts"
              className="w-full flex items-center flex-col gap-1"
            >
              <Users className="stroke-white h-5" />
              <span className="text-white text-sm">Contacts</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={`${
          pathname === "/settings" ? "opacity-100" : "opacity-50"
        } p-4 transition-opacity duration-200`}
      >
        <Link
          href="/settings"
          className="w-full flex items-center flex-col gap-1"
        >
          <Settings className="stroke-white h-5" />
          <span className="text-white text-sm">Settings</span>
        </Link>
      </div>
    </aside>
  );
};
