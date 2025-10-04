import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "overdue";
  description: string;
  maxMarks: number;
}

const assignmentsData: Assignment[] = [
  {
    id: "1",
    title: "Data Structures Assignment 1",
    subject: "Data Structures",
    dueDate: "2025-04-20",
    status: "pending",
    description: "Implement binary search tree operations",
    maxMarks: 20,
  },
  {
    id: "2",
    title: "Database Project",
    subject: "Database Management",
    dueDate: "2025-04-25",
    status: "pending",
    description: "Design and implement a college management system",
    maxMarks: 30,
  },
  {
    id: "3",
    title: "Web Development Task",
    subject: "Web Development",
    dueDate: "2025-04-15",
    status: "submitted",
    description: "Create a responsive website using React",
    maxMarks: 25,
  },
];

const Assignments = () => {
  const navigate = useNavigate();
  const [assignments] = useState<Assignment[]>(assignmentsData);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default";
      case "overdue":
        return "destructive";
      default:
        return "warning";
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const days = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Assignments</h1>
          <p className="text-muted-foreground">
            Track and submit your course assignments
          </p>
        </div>
        <Button onClick={() => navigate("/assignments/submit")} className="gap-2">
          <Upload className="h-4 w-4" />
          Submit Assignment
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Total Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{assignments.length}</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {assignments.filter((a) => a.status === "pending").length}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {assignments.filter((a) => a.status === "submitted").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => {
          const daysUntil = getDaysUntilDue(assignment.dueDate);
          return (
            <Card key={assignment.id} className="border-l-4 border-l-primary hover-scale">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {assignment.title}
                      <Badge variant={getStatusColor(assignment.status) as any} className="gap-1">
                        {getStatusIcon(assignment.status)}
                        {assignment.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{assignment.subject}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Max Marks</p>
                    <p className="text-lg font-bold">{assignment.maxMarks}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">
                      {format(new Date(assignment.dueDate), "MMM dd, yyyy")}
                      {daysUntil > 0 && assignment.status === "pending" && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({daysUntil} days left)
                        </span>
                      )}
                    </p>
                  </div>
                  {assignment.status === "pending" && (
                    <Button
                      onClick={() => navigate(`/assignments/submit/${assignment.id}`)}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Submit
                    </Button>
                  )}
                  {assignment.status === "submitted" && (
                    <Button variant="outline" disabled>
                      Submitted
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Assignments;
