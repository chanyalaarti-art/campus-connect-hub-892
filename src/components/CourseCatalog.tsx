import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Clock, Award } from "lucide-react";

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const courses = [
    {
      code: "CS301",
      name: "Data Structures & Algorithms",
      department: "Computer Science",
      credits: 4,
      semester: "Spring 2025",
      prerequisites: ["CS101", "CS102"],
      description: "Study of fundamental data structures and algorithmic techniques",
      instructor: "Dr. Sarah Johnson",
      seats: "25/50",
    },
    {
      code: "MATH201",
      name: "Calculus II",
      department: "Mathematics",
      credits: 4,
      semester: "Spring 2025",
      prerequisites: ["MATH101"],
      description: "Integration, sequences, series, and multivariable calculus",
      instructor: "Prof. Michael Chen",
      seats: "30/40",
    },
    {
      code: "PHY305",
      name: "Quantum Mechanics",
      department: "Physics",
      credits: 3,
      semester: "Spring 2025",
      prerequisites: ["PHY201", "MATH201"],
      description: "Introduction to quantum theory and wave mechanics",
      instructor: "Dr. Emily Rodriguez",
      seats: "15/30",
    },
    {
      code: "BUS401",
      name: "Marketing Strategy",
      department: "Business",
      credits: 3,
      semester: "Spring 2025",
      prerequisites: ["BUS201"],
      description: "Advanced marketing concepts and strategic planning",
      instructor: "Prof. David Kumar",
      seats: "35/45",
    },
    {
      code: "CS405",
      name: "Machine Learning",
      department: "Computer Science",
      credits: 4,
      semester: "Spring 2025",
      prerequisites: ["CS301", "MATH201"],
      description: "Supervised and unsupervised learning algorithms and applications",
      instructor: "Dr. Sarah Johnson",
      seats: "20/35",
    },
  ];

  const departments = ["all", "Computer Science", "Mathematics", "Physics", "Business"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      departmentFilter === "all" || course.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Course Catalog</h2>
        <p className="text-muted-foreground">Browse available courses and programs</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by course name, code, or instructor..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredCourses.map((course, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="outline" className="font-mono">{course.code}</Badge>
                    <CardTitle className="text-xl">{course.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge>{course.department}</Badge>
                    <Badge variant="secondary">{course.semester}</Badge>
                  </div>
                </div>
                <Button>Enroll</Button>
              </div>
              <CardDescription className="mt-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Credits</p>
                    <p className="font-medium">{course.credits} credits</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Instructor</p>
                    <p className="font-medium">{course.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Available Seats</p>
                    <p className="font-medium">{course.seats}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Prerequisites</p>
                  <div className="flex flex-wrap gap-1">
                    {course.prerequisites.map((prereq, j) => (
                      <Badge key={j} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseCatalog;
