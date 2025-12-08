import type { Metadata } from "next";
import Link from "next/link";
import { ReduxProvider } from "./reduxProvider";
import { TabBar } from "@widgets/TabBar";
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
        <TabBar />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
