"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterClient() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#141414",
          color: "#f2f2f2",
          border: "1px solid #2a2a2a",
        },
        success: { iconTheme: { primary: "#ccff00", secondary: "#0a0a0a" } },
      }}
    />
  );
}
