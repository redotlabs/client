import type { ReactNode } from "react";
import { ThemeProvider } from "@redotlabs/themes";

export default function ThemeRoot({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider color="blue" font="pretendard">
      {children}
    </ThemeProvider>
  );
}
