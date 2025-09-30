import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, User } from "lucide-react";
import { useState } from "react";

const ClassSchedule = () => {
  const [selectedSemester, setSelectedSemester] = useState("6");

  const schedule = {
    Monday: [
      { time: "9:00 - 10:30 AM", course: "CF301", name: "Cyber forensic", room: "CS Lab 2", instructor: "Gouri mam" },
      { time: "11:00 AM - 12:30 PM", course: "PM201", name: "Project Management", room: "PM 305", instructor: "Prof. Shruti" },
      { time: "2:00 - 3:30 PM", course: "STQ305", name: "Software Testing", room: "STQ 301", instructor: "Pavan Sir" },
    ],
    Tuesday: [
      { time: "10:00 - 11:30 AM", course: "CS405", name: "Machine Learning", room: "CS Lab 3", instructor: "Prof.Ajay" },
      { time: "1:00 - 2:30 PM", course: "BUS401", name: "Marketing Strategy", room: "Business 108", instructor: "Prof. Kumar" },
    ],
    Wednesday: [
      { time: "9:00 - 10:30 AM", course: "CS301", name: "Data Structures", room: "CS Lab 2", instructor: "Dr. Johnson" },
      { time: "11:00 AM - 12:30 PM", course: "MATH201", name: "Calculus II", room: "Math 105", instructor: "Prof. Chen" },
      { time: "3:00 - 4:30 PM", course: "PHY305 Lab", name: "Quantum Lab", room: "Physics Lab 1", instructor: "Dr. Rodriguez" },
    ],
    Thursday: [
      { time: "10:00 - 11:30 AM", course: "CS405", name: "Machine Learning", room: "CS Lab 3", instructor: "Dr. Johnson" },
      { time: "1:00 - 2:30 PM", course: "BUS401", name: "Marketing Strategy", room: "Business 108", instructor: "Prof. Kumar" },
    ],
    Friday: [
      { time: "9:00 - 10:30 AM", course: "CS301 Lab", name: "DS Lab", room: "CS Lab 1", instructor: "TA: Sarah" },
      { time: "2:00 - 3:30 PM", course: "PHY305", name: "Quantum Mechanics", room: "Physics 201", instructor: "Dr. Rodriguez" },
    ],
  };

  const days = Object.keys(schedule);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Class Schedule</h2>
          <p className="text-muted-foreground">Weekly timetable for your courses</p>
        </div>
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">Semester 6</SelectItem>
            <SelectItem value="5">Semester 5</SelectItem>
            <SelectItem value="4">Semester 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {days.map((day) => (
          <Card key={day}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule[day as keyof typeof schedule].map((class_, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{class_.time}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="font-mono text-xs">
                          {class_.course}
                        </Badge>
                        <span className="font-semibold">{class_.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{class_.room}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{class_.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Schedule Notes</CardTitle>
          <CardDescription>
            <ul className="space-y-1 mt-2">
              <li>• Classes marked with "Lab" require practical work</li>
              <li>• Always arrive 5 minutes early to class</li>
              <li>• Check your email for any schedule changes or cancellations</li>
              <li>• Office hours available after class or by appointment</li>
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ClassSchedule;
