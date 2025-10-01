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
      code: "BCA",
      name: "Bachelor of Computer Applications",
      department: "Computer Science",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Comprehensive program in computer applications and software development",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BMS",
      name: "Bachelor of Management Studies",
      department: "Management",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Business management and administration program",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BSC",
      name: "Bachelor of Science",
      department: "Science",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Science degree with multiple specialization options",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BMM",
      name: "Bachelor of Arts (Advertising/Journalism)",
      department: "Mass Media",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Media, advertising and journalism program",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BFM",
      name: "Bachelor of Commerce - Financial Markets",
      department: "Commerce",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Specialized program in financial markets and trading",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BCOM",
      name: "Bachelor of Commerce",
      department: "Commerce",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Traditional commerce degree program",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BBI",
      name: "Bachelor of Banking & Insurance",
      department: "Commerce",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Specialized program in banking and insurance sector",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BAF",
      name: "Bachelor of Commerce - Accounting and Finance",
      department: "Commerce",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Focused on accounting and financial management",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "BBA",
      name: "Bachelor of Business Administration",
      department: "Management",
      credits: 120,
      semester: "3 Years",
      prerequisites: [],
      description: "Business administration and entrepreneurship program",
      instructor: "Various Faculty",
      seats: "Open",
    },
    {
      code: "FYJC",
      name: "First Year Junior College",
      department: "Junior College",
      credits: 60,
      semester: "2 Years",
      prerequisites: [],
      description: "Foundation program for higher education (11th & 12th)",
      instructor: "Various Faculty",
      seats: "Open",
    },
  ];

  const departments = ["all", "Computer Science", "Management", "Commerce", "Science", "Mass Media", "Junior College"];

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
