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
      name: "Dr. Sarah Johnson",
      designation: "Professor & HOD",
      department: "Computer Science",
      specialization: "Artificial Intelligence, Machine Learning",
      email: "s.johnson@college.edu",
      phone: "+1 (555) 234-5678",
      office: "CS Building, Room 301",
      hours: "Mon-Fri, 2-4 PM",
    },
    {
      name: "Prof. Michael Chen",
      designation: "Associate Professor",
      department: "Mathematics",
      specialization: "Applied Mathematics, Statistics",
      email: "m.chen@college.edu",
      phone: "+1 (555) 345-6789",
      office: "Math Block, Room 205",
      hours: "Tue-Thu, 3-5 PM",
    },
    {
      name: "Dr. Emily Rodriguez",
      designation: "Assistant Professor",
      department: "Physics",
      specialization: "Quantum Mechanics, Thermodynamics",
      email: "e.rodriguez@college.edu",
      phone: "+1 (555) 456-7890",
      office: "Science Wing, Room 412",
      hours: "Mon-Wed, 1-3 PM",
    },
    {
      name: "Prof. David Kumar",
      designation: "Professor",
      department: "Business Administration",
      specialization: "Marketing, Entrepreneurship",
      email: "d.kumar@college.edu",
      phone: "+1 (555) 567-8901",
      office: "Business Block, Room 108",
      hours: "Wed-Fri, 10 AM-12 PM",
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
