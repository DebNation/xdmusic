"use client";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-poppins",
});
// export const metadata = {
//   title: "Muzik Player",
//   description: "Made by debxd",
// };
//
const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={poppins.variable}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
