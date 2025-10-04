import { Link } from "react-router-dom";
import { BookOpen, Calendar, GraduationCap, Users, FileText, Library, ClipboardList, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const quickLinks = [
    { icon: Calendar, label: "Events", color: "text-green-500", path: "/events" },
    { icon: Users, label: "Faculty", color: "text-purple-500", path: "/faculty" },
    { icon: BookOpen, label: "Courses", color: "text-red-500", path: "/courses" },
    { icon: Library, label: "Library", color: "text-indigo-500", path: "/library" },
    { icon: ClipboardList, label: "Assignments", color: "text-orange-500", path: "/assignments" },
    { icon: FileText, label: "Exams", color: "text-blue-500", path: "/exams" },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Academic Excellence",
      description: "Affiliated to University of Mumbai with modern teaching methodologies",
    },
    {
      icon: Award,
      title: "Quality Education",
      description: "Experienced faculty and industry-relevant curriculum",
    },
    {
      icon: Users,
      title: "Student Support",
      description: "Dedicated mentorship and career guidance programs",
    },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Welcome to <span className="text-primary">LN College</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your gateway to quality education and excellence. We specialize in various fields with the aim of delivering the best educational experience in Mumbai.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/admissions">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm pt-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                <span>Mon-Fri: 10 AM - 6 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span>University of Mumbai Affiliated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                <Card className="cursor-pointer hover:border-primary transition-all hover-scale">
                  <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                    <span className="text-sm font-medium text-center">{item.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose LN College</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="hover-scale">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Student Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/library">
              <Card className="hover-scale h-full">
                <CardHeader>
                  <Library className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Library</CardTitle>
                  <CardDescription>Browse 5000+ books</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Explore</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/assignments">
              <Card className="hover-scale h-full">
                <CardHeader>
                  <ClipboardList className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Track & submit work</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">View All</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/exams">
              <Card className="hover-scale h-full">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Exams</CardTitle>
                  <CardDescription>Schedule & results</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Check Now</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/fees">
              <Card className="hover-scale h-full">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Fee Payment</CardTitle>
                  <CardDescription>View & pay fees</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Pay Now</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
