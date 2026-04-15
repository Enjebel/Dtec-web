import { AuthProvider } from "./auth";
import { ConvexProvider } from "./convex";
import { QueryClientProvider } from "./query-client";
import { ThemeProvider } from "./theme";
import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";

export function DefaultProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider>
      <AuthProvider>
        <QueryClientProvider>
          <TooltipProvider>
            <ThemeProvider>
              <Toaster position="top-center" />
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ConvexProvider>
  );
}