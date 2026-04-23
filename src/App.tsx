import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import SitePopups from "@/components/SitePopups";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Ministries from "./pages/Ministries.tsx";
import Gallery from "./pages/Gallery.tsx";
import Connect from "./pages/Connect.tsx";
import Sermons from "./pages/Sermons.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SitePopups />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
