import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const EventsCalendar = () => {
  const events = [
    {
      title: "UTSAV 2024-2025",
      type: "Festival",
      date: "February 16, 2025",
      time: "9:00 AM onwards",
      location: "LN College Campus",
      description: "Annual college festival with cultural programs, competitions, and celebrations",
      capacity: "Open to all students",
      registration: true,
      featured: true,
    },
    {
      title: "Admission Open for 2025-26",
      type: "Admission",
      date: "March 1 - April 30, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "College Office",
      description: "Apply for various undergraduate programs. Online admission portal available",
      capacity: "Open to all eligible students",
      registration: true,
    },
    {
      title: "Career Guidance Workshop",
      type: "Workshop",
      date: "March 15, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Main Auditorium",
      description: "Expert guidance on career planning and higher education opportunities",
      capacity: "Open to all students",
      registration: false,
    },
    {
      title: "Sports Day",
      type: "Sports",
      date: "March 25, 2025",
      time: "8:00 AM onwards",
      location: "College Playground",
      description: "Inter-departmental sports competitions and activities",
      capacity: "All students welcome",
      registration: true,
    },
  ];

  const getEventColor = (type: string) => {
    const colors: Record<string, string> = {
      Festival: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      Workshop: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      Admission: "bg-green-500/10 text-green-600 border-green-500/20",
      Sports: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      Seminar: "bg-pink-500/10 text-pink-600 border-pink-500/20",
    };
    return colors[type] || "bg-gray-500/10 text-gray-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Events & Activities</h2>
        <p className="text-muted-foreground">Stay updated with campus happenings</p>
      </div>

      <div className="space-y-4">
        {events.map((event, i) => (
          <Card key={i} className={event.featured ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    {event.featured && (
                      <Badge className="bg-primary">Featured</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getEventColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                </div>
                {event.registration && (
                  <Button>Register Now</Button>
                )}
              </div>
              <CardDescription className="text-base mt-2">
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{event.capacity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsCalendar;
