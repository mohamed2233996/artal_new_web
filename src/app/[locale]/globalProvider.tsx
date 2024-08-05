"use client";

import { AppStoreProvider } from "@/providers/app-store-provider";
import Provider from "@/providers/session-provider";
import { Toaster } from "react-hot-toast";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider>
        <AppStoreProvider>
          {children}
          <Toaster position="top-center" />
        </AppStoreProvider>
      </Provider>
    </>
  );
};

export default GlobalProvider;
