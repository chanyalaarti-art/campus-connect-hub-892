import { useState } from "react";
import { Bell, BookOpen, Calendar, CreditCard, GraduationCap, Users, FileText, Award, Library, ClipboardList, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeesDashboard from "@/components/FeesDashboard";
import FacultyDirectory from "@/components/FacultyDirectory";
import EventsCalendar from "@/components/EventsCalendar";
import ScholarshipsSection from "@/components/ScholarshipsSection";
import CourseCatalog from "@/components/CourseCatalog";
import ClassSchedule from "@/components/ClassSchedule";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Campus Portal</h1>
              <p className="text-xs text-muted-foreground">Your Academic Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            <Button>Student Login</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Welcome to Your Academic Dashboard
            </h2>
            <p className="text-lg text-muted-foreground">
              Access everything you need for your college journey - from fees and schedules to events and resources.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: CreditCard, label: "Pay Fees", color: "text-blue-500" },
              { icon: Calendar, label: "Events", color: "text-green-500" },
              { icon: Users, label: "Faculty", color: "text-purple-500" },
              { icon: Award, label: "Scholarships", color: "text-yellow-500" },
              { icon: BookOpen, label: "Courses", color: "text-red-500" },
              { icon: Library, label: "Library", color: "text-indigo-500" },
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
          <Tabs defaultValue="fees" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="fees">Fees</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="fees">
              <FeesDashboard />
            </TabsContent>

            <TabsContent value="faculty">
              <FacultyDirectory />
            </TabsContent>

            <TabsContent value="events">
              <EventsCalendar />
            </TabsContent>

            <TabsContent value="scholarships">
              <ScholarshipsSection />
            </TabsContent>

            <TabsContent value="courses">
              <CourseCatalog />
            </TabsContent>

            <TabsContent value="schedule">
              <ClassSchedule />
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
              <p className="text-sm text-muted-foreground mb-2">Email: info@college.edu</p>
              <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 Campus Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
