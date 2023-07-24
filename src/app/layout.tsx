"use client";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poppins } from "next/font/google";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import allReducers from "@/reducers";
import albumClickedReducer from "@/reducers/albumClicked";
import { Provider } from "react-redux";
import setSongUrlReducer from "@/reducers/setSongUrl";

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
const store = configureStore({
  reducer: {
    albumClicked: albumClickedReducer,
    setSongUrl: setSongUrlReducer,
  },
});

// const store = configureStore({allReducers});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <body className={poppins.variable}>{children}</body>
        </Provider>
      </QueryClientProvider>
    </html>
  );
}
