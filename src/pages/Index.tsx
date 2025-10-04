import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, BookOpen, Calendar, GraduationCap, Users, FileText, Library, ClipboardList, Clock, LogOut, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacultyDirectory from "@/components/FacultyDirectory";
import EventsCalendar from "@/components/EventsCalendar";
import LibraryBooks from "@/components/LibraryBooks";
import CourseCatalog from "@/components/CourseCatalog";
import ClassSchedule from "@/components/ClassSchedule";
import FeesDashboard from "@/components/FeesDashboard";
import AdmissionsSection from "@/components/AdmissionsSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">LN College</h1>
              <p className="text-xs text-muted-foreground">Affiliated to University of Mumbai</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate("/auth")}>Student Login</Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Welcome to LN College
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              LN Group of Institute - Your hub for quality education and excellence. We provide specialization in various fields with the aim of delivering best quality education.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 10 AM - 6 PM</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>📍</span>
                <span>Rajendra Nagar, Borivali East, Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Calendar, label: "Events", color: "text-green-500" },
              { icon: Users, label: "Faculty", color: "text-purple-500" },
              { icon: BookOpen, label: "Courses", color: "text-red-500" },
              { icon: Library, label: "Library", color: "text-indigo-500" },
              { icon: ClipboardList, label: "Schedule", color: "text-orange-500" },
            ].map((item, i) => (
              <Card key={i} className="cursor-pointer hover:border-primary transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <Tabs defaultValue="faculty" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
            </TabsList>

            <TabsContent value="faculty">
              <FacultyDirectory />
            </TabsContent>

            <TabsContent value="events">
              <EventsCalendar />
            </TabsContent>

            <TabsContent value="library">
              <LibraryBooks />
            </TabsContent>

            <TabsContent value="courses">
              <CourseCatalog />
            </TabsContent>

            <TabsContent value="schedule">
              <ClassSchedule />
            </TabsContent>

            <TabsContent value="fees">
              <FeesDashboard />
            </TabsContent>

            <TabsContent value="admissions">
              <AdmissionsSection />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-8 bg-muted/50">
        <div className="container">
          <h3 className="text-2xl font-bold mb-6">More Resources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Syllabus & Notes</CardTitle>
                <CardDescription>Download course materials</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Materials</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ClipboardList className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Assignments</CardTitle>
                <CardDescription>Track your pending tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Assignments</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Exams & Results</CardTitle>
                <CardDescription>Check your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Results</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Library className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Library</CardTitle>
                <CardDescription>Search books & resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Browse Catalog</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Admissions</a></li>
                <li><a href="#" className="hover:text-foreground">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-foreground">Campus Map</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">FAQs</a></li>
                <li><a href="#" className="hover:text-foreground">Technical Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <p className="text-sm text-muted-foreground mb-2">Email: hellolncollege@gmail.com</p>
              <p className="text-sm text-muted-foreground mb-2">Phone: 8655507171 | 8655022625</p>
              <p className="text-sm text-muted-foreground">Near General Kariappa Bridge, 89, FM Cariappa Flyover</p>
              <p className="text-sm text-muted-foreground">Rajendra Nagar, Borivali East, Mumbai</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 LN College. All rights reserved. | Affiliated to University of Mumbai
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
