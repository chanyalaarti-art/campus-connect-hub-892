import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

const ApplicationStatus = () => {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchApplication();
    setupRealtimeSubscription();
  }, []);

  const fetchApplication = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading application",
        description: error.message,
      });
    } else if (!data) {
      navigate("/apply-for-campus");
    } else {
      setApplication(data);
    }
    setLoading(false);
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel("application-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "applications",
        },
        (payload) => {
          setApplication(payload.new);
          toast({
            title: "Application Updated",
            description: `Your application status has been updated to: ${payload.new.status}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          icon: CheckCircle2,
          label: "Approved",
          className: "bg-green-500/10 text-green-500 border-green-500/20",
          description: "Congratulations! Your application has been approved.",
        };
      case "rejected":
        return {
          icon: XCircle,
          label: "Rejected",
          className: "bg-destructive/10 text-destructive border-destructive/20",
          description: "Unfortunately, your application was not approved at this time.",
        };
      default:
        return {
          icon: Clock,
          label: "Under Review",
          className: "bg-primary/10 text-primary border-primary/20",
          description: "Your application is currently being reviewed by our admissions team.",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!application) {
    return null;
  }

  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Application Status</h1>
        <p className="text-muted-foreground">
          Track your campus admission application progress
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Your Application</CardTitle>
              <CardDescription>
                Submitted on {format(new Date(application.created_at), "MMMM dd, yyyy")}
              </CardDescription>
            </div>
            <Badge variant="outline" className={`${statusConfig.className} px-4 py-2 text-base`}>
              <StatusIcon className="h-5 w-5 mr-2" />
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-center text-sm md:text-base">{statusConfig.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Personal Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{application.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{application.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">
                      {format(new Date(application.date_of_birth), "MMMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Address</p>
                    <p className="font-medium">{application.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Course</p>
                    <p className="font-medium">{application.course}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Department</p>
                    <p className="font-medium">{application.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {application.documents && application.documents.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {application.documents.map((doc: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg border bg-card text-sm"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
              Back to Home
            </Button>
            {application.status === "approved" && (
              <Button onClick={() => navigate("/dashboard")} className="flex-1">
                Access Student Portal
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
