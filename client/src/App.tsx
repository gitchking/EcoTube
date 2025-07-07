import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import FAQs from "@/pages/faqs";
import Changelog from "@/pages/changelog";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

function Router() {
  // Cleanup temporary files when app mounts and unmounts
  useEffect(() => {
    const handleCleanup = async () => {
      try {
        await fetch('/api/cleanup', { method: 'POST' });
      } catch (error) {
        console.error('Cleanup failed:', error);
      }
    };

    // Cleanup on mount (page refresh)
    handleCleanup();

    // Cleanup on page unload
    const handleBeforeUnload = () => {
      navigator.sendBeacon('/api/cleanup');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleCleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 flex flex-col">
      <Navigation />
      <main className="flex-1 min-h-0">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/faqs" component={FAQs} />
          <Route path="/changelog" component={Changelog} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ecotube-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;