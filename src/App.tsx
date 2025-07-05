import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "@/contexts/AuthContext";
import { KYCProvider } from "@/contexts/KYCContext";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { SuggestionProvider } from "@/contexts/SuggestionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WishlistProvider } from "@/contexts/WishlistContext";

// Route Guard
import { RouteGuard } from "@/components/layout/RouteGuard";

// Pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import PropertyDetail from "./pages/PropertyDetail";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import SecondaryDesk from "./pages/SecondaryDesk";
import ValuationReport from "./pages/ValuationReport";
import UserSettings from "./pages/UserSettings";
import AdminDashboard from "./pages/AdminDashboard";
import AuthModal from "./pages/AuthModal";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <KYCProvider>
            <PortfolioProvider>
              <SuggestionProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/properties" element={<Marketplace />} />
                    <Route path="/properties/:id" element={<PropertyDetail />} />
                    <Route path="/valuation/:id" element={<ValuationReport />} />
                    <Route path="/auth" element={<AuthModal />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/unauthorized" element={<ErrorPage />} />
                    
                    {/* Protected Routes - Require Auth */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <RouteGuard requireAuth>
                          <Dashboard />
                        </RouteGuard>
                      } 
                    />
                    <Route 
                      path="/account/profile" 
                      element={
                        <RouteGuard requireAuth>
                          <Profile />
                        </RouteGuard>
                      } 
                    />
                    <Route 
                      path="/account/portfolio" 
                      element={
                        <RouteGuard requireAuth>
                          <Portfolio />
                        </RouteGuard>
                      } 
                    />
                    <Route 
                      path="/wishlist" 
                      element={<Wishlist />} 
                    />
                    <Route 
                      path="/trade" 
                      element={
                        <RouteGuard requireAuth requireKYC>
                          <SecondaryDesk />
                        </RouteGuard>
                      } 
                    />
                    <Route 
                      path="/account/settings" 
                      element={
                        <RouteGuard requireAuth>
                          <UserSettings />
                        </RouteGuard>
                      } 
                    />
                    
                    {/* Admin Routes */}
                    <Route 
                      path="/admin" 
                      element={
                        <RouteGuard requireAuth requiredRole="admin">
                          <AdminDashboard />
                        </RouteGuard>
                      } 
                    />
                    
                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
              </SuggestionProvider>
            </PortfolioProvider>
          </KYCProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
