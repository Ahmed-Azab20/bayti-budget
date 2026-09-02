import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const isLogin = window.location.pathname === "/login";
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster position="top-center" richColors />{isLogin ? <Login /> : <Home />}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
