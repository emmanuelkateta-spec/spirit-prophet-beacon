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
import Blog from "./pages/Blog.tsx";
import Press from "./pages/Press.tsx";
import Podcasts from "./pages/Podcasts.tsx";
import RevelationsHub from "./pages/RevelationsHub.tsx";
import Academy from "./pages/Academy.tsx";
import GlobalMap from "./pages/GlobalMap.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import Appointment from "./pages/Appointment.tsx";
import Bible from "./pages/Bible.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import UpcomingPrograms from "./pages/UpcomingPrograms.tsx";
import NotFound from "./pages/NotFound.tsx";
import TabletLogin from "./pages/tablet/TabletLogin.tsx";
import TabletAuthGuard from "./pages/tablet/TabletAuthGuard.tsx";
import TabletDashboard from "./pages/tablet/TabletDashboard.tsx";
import TabletChats from "./pages/tablet/TabletChats.tsx";
import TabletEvents from "./pages/tablet/TabletEvents.tsx";
import TabletPartners from "./pages/tablet/TabletPartners.tsx";
import TabletLive from "./pages/tablet/TabletLive.tsx";
import TabletManagement from "./pages/tablet/TabletManagement.tsx";
import TabletProtocols from "./pages/tablet/TabletProtocols.tsx";
import TabletUshers from "./pages/tablet/TabletUshers.tsx";
import TabletMedia from "./pages/tablet/TabletMedia.tsx";
import TabletFamily from "./pages/tablet/TabletFamily.tsx";
import Tablet12for12 from "./pages/tablet/Tablet12for12.tsx";
import TabletLeaderboard from "./pages/tablet/TabletLeaderboard.tsx";
import TabletEnquiries from "./pages/tablet/TabletEnquiries.tsx";
import TabletSettings from "./pages/tablet/TabletSettings.tsx";

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
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/revelations-hub" element={<RevelationsHub />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/global-map" element={<GlobalMap />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/upcoming-programs" element={<UpcomingPrograms />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          {/* SFM Tablet Portal */}
          <Route path="/tablet/login" element={<TabletLogin />} />
          <Route path="/tablet" element={<TabletAuthGuard><TabletDashboard /></TabletAuthGuard>} />
          <Route path="/tablet/chats" element={<TabletAuthGuard><TabletChats /></TabletAuthGuard>} />
          <Route path="/tablet/events" element={<TabletAuthGuard><TabletEvents /></TabletAuthGuard>} />
          <Route path="/tablet/partners" element={<TabletAuthGuard><TabletPartners /></TabletAuthGuard>} />
          <Route path="/tablet/live" element={<TabletAuthGuard><TabletLive /></TabletAuthGuard>} />
          <Route path="/tablet/management" element={<TabletAuthGuard><TabletManagement /></TabletAuthGuard>} />
          <Route path="/tablet/protocols" element={<TabletAuthGuard><TabletProtocols /></TabletAuthGuard>} />
          <Route path="/tablet/ushers" element={<TabletAuthGuard><TabletUshers /></TabletAuthGuard>} />
          <Route path="/tablet/media" element={<TabletAuthGuard><TabletMedia /></TabletAuthGuard>} />
          <Route path="/tablet/family" element={<TabletAuthGuard><TabletFamily /></TabletAuthGuard>} />
          <Route path="/tablet/12for12" element={<TabletAuthGuard><Tablet12for12 /></TabletAuthGuard>} />
          <Route path="/tablet/leaderboard" element={<TabletAuthGuard><TabletLeaderboard /></TabletAuthGuard>} />
          <Route path="/tablet/enquiries" element={<TabletAuthGuard><TabletEnquiries /></TabletAuthGuard>} />
          <Route path="/tablet/settings" element={<TabletAuthGuard><TabletSettings /></TabletAuthGuard>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
