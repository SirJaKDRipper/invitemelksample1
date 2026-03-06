import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InvitemeLK",
  description: "it's more than a wedding invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
