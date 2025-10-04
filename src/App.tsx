import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Library from "./pages/Library";
import RequestBook from "./pages/RequestBook";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Events from "./pages/Events";
import Fees from "./pages/Fees";
import Admissions from "./pages/Admissions";
import Exams from "./pages/Exams";
import Assignments from "./pages/Assignments";
import SubmitAssignment from "./pages/SubmitAssignment";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <Breadcrumbs />
          <main className="flex-1 container py-6">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/library" element={<Library />} />
              <Route path="/library/request" element={<RequestBook />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/events" element={<Events />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/assignments/submit" element={<SubmitAssignment />} />
              <Route path="/assignments/submit/:id" element={<SubmitAssignment />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
