
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import RepairRequests from "./pages/RepairRequests";
import RepairDetail from "./pages/RepairDetail";
import Appointments from "./pages/Appointments";
import Payments from "./pages/Payments";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import AllServices from "./pages/admin/AllServices";  
import AllVendorServices from "./pages/vendor/AllServices";  
import AllRequests from "./pages/admin/AllRequests";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AllReviews from "./pages/admin/AllReviews";
import AuthorizeServices from "./pages/admin/AuthorizeServices";
import VendorRequests from "./pages/vendor/VendorRequests";
import RequestHistory from "./pages/vendor/RequestHistory";
import AdminRequestHistory from "./pages/admin/AdminRequestHistory";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/repairs" element={<RepairRequests />} />
            <Route path="/repairs/:repairId" element={<RepairDetail />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/all-services" element={<AllServices />} />
            <Route path="/admin/all-repairs" element={<AllRequests />} /> 
            <Route path="/admin/all-reviews" element={<AllReviews />} /> 
            <Route path="/vendor/all-repairs" element={<VendorRequests />} /> 
            <Route path="/vendor/request-history" element={<RequestHistory />} /> 
            <Route path="/admin/request-history" element={<AdminRequestHistory />} /> 

            
            <Route path="/vendor/all-services" element={<AllVendorServices />} /> 
            <Route path="/admin/all-appointments" element={<AllAppointments />} /> 
            <Route path="/admin/authorize-services" element={<AuthorizeServices />} /> 
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
