import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock, Search } from "lucide-react";
import { useState } from "react";

const FacultyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faculty = [
    {
      name: "Prof. Rajesh Kumar",
      designation: "Professor",
      department: "Computer Science",
      specialization: "Database Management, Web Development, Programming",
      email: "rajesh.kumar@lncollege.edu",
      phone: "8655507171",
      office: "CS Department, 2nd Floor",
      hours: "Mon-Fri, 10 AM - 6 PM",
    },
    {
      name: "Prof. Priya Sharma",
      designation: "Associate Professor",
      department: "Commerce",
      specialization: "Financial Accounting, Cost Accounting, Taxation",
      email: "priya.sharma@lncollege.edu",
      phone: "8655022625",
      office: "Commerce Department, 1st Floor",
      hours: "Mon-Fri, 10 AM - 6 PM",
    },
    {
      name: "Prof. Amit Patel",
      designation: "Assistant Professor",
      department: "Management",
      specialization: "Marketing Management, Business Communication, HR",
      email: "amit.patel@lncollege.edu",
      phone: "8655507171",
      office: "Management Department, 1st Floor",
      hours: "Mon-Fri, 10 AM - 6 PM",
    },
    {
      name: "Prof. Sneha Desai",
      designation: "Professor",
      department: "Mass Media",
      specialization: "Journalism, Digital Media, Content Creation",
      email: "sneha.desai@lncollege.edu",
      phone: "8655022625",
      office: "Media Department, 3rd Floor",
      hours: "Mon-Fri, 10 AM - 6 PM",
    },
    {
      name: "Prof. Vikram Singh",
      designation: "Associate Professor",
      department: "Science",
      specialization: "Physics, Chemistry, Mathematics",
      email: "vikram.singh@lncollege.edu",
      phone: "8655507171",
      office: "Science Department, 2nd Floor",
      hours: "Mon-Fri, 10 AM - 6 PM",
    },
    {
      name: "Prof. Kavita Mehta",
      designation: "Assistant Professor",
      department: "Banking & Finance",
      specialization: "Banking Operations, Financial Markets, Investment",
      email: "kavita.mehta@lncollege.edu",
      phone: "8655022625",
      office: "Finance Department, 1st Floor",
      hours: "Mon-Fri, 10 AM - 6 PM",
    },
  ];

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Faculty Directory</h2>
        <p className="text-muted-foreground">Connect with our distinguished educators</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, department, or specialization..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredFaculty.map((member, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {member.designation}
                  </CardDescription>
                  <Badge className="mt-2" variant="secondary">{member.department}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Specialization</p>
                <p className="text-sm text-muted-foreground">{member.specialization}</p>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.office}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{member.hours}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-2">Schedule Appointment</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FacultyDirectory;
