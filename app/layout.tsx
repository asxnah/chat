import type { Metadata } from "next";
import Link from "next/link";
import { ReduxProvider } from "./reduxProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[100vh] flex relative">
        <nav>
          <ul className="absolute w-full px-4 py-2 flex flex gap-6 justify-center bg-[rgba(255,255,255,0.9)] ">
            <li className="before:mr-1.5 before:text-xs before:content-['🔗']">
              <Link href="/">Preview</Link>
            </li>
            <li className="before:mr-1.5 before:text-xs before:content-['🔗']">
              <Link href="signup">Signup</Link>
            </li>
            <li className="before:mr-1.5 before:text-xs before:content-['🔗']">
              <Link href="login">Login</Link>
            </li>
            <li className="before:mr-1.5 before:text-xs before:content-['🔗']">
              <Link href="email-confirmation">Email confirmation</Link>
            </li>
          </ul>
        </nav>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
