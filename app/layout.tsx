import type { Metadata } from "next";
import { ReduxProvider } from "@/reduxProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[100vh] flex">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
