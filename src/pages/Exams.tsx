import { useState, useEffect } from "react";
import { Calendar, FileText, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  room: string;
  semester: number;
}

const examsData: Exam[] = [
  {
    id: "1",
    subject: "Data Structures",
    date: "2025-05-15",
    time: "10:00 AM",
    duration: "3 hours",
    room: "Room 101",
    semester: 3,
  },
  {
    id: "2",
    subject: "Database Management",
    date: "2025-05-18",
    time: "2:00 PM",
    duration: "3 hours",
    room: "Room 102",
    semester: 3,
  },
  {
    id: "3",
    subject: "Web Development",
    date: "2025-05-22",
    time: "10:00 AM",
    duration: "3 hours",
    room: "Lab 201",
    semester: 3,
  },
];

const Exams = () => {
  const [loading, setLoading] = useState(false);

  const getDaysUntilExam = (examDate: string) => {
    const now = new Date();
    const exam = new Date(examDate);
    const days = Math.ceil((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Exams & Results</h1>
        <p className="text-muted-foreground">
          View exam schedules, download hall tickets, and check your results
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{examsData.length}</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Hall Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Download
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Latest Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="previous">Previous Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Examinations</CardTitle>
              <CardDescription>Semester 3 - May 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {examsData.map((exam) => {
                const daysUntil = getDaysUntilExam(exam.date);
                return (
                  <Card key={exam.id} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{exam.subject}</CardTitle>
                          <CardDescription className="mt-1">
                            {format(new Date(exam.date), "EEEE, MMMM dd, yyyy")}
                          </CardDescription>
                        </div>
                        <Badge variant={daysUntil <= 7 ? "destructive" : "default"}>
                          {daysUntil > 0 ? `${daysUntil} days` : "Today"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-medium flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {exam.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium mt-1">{exam.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Room</p>
                          <p className="font-medium mt-1">{exam.room}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Exam Results</CardTitle>
              <CardDescription>Your academic performance records</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                No results available yet. Check back after exam completion.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous">
          <Card>
            <CardHeader>
              <CardTitle>Previous Examinations</CardTitle>
              <CardDescription>Past exam papers and answer keys</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Previous exam papers will be available here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Exams;
