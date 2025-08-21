import { useTheme } from "@/store/hooks";
import type { ReactNode } from "react";

function ThemeProvider({ children }: { children: ReactNode }) {
  useTheme();

  return <>{children}</>;
}

export default ThemeProvider;
