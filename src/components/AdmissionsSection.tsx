import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Calendar, Users, FileText, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface AdmissionProgram {
  id: string;
  program_name: string;
  eligibility: string;
  fee_structure: string;
  duration: string;
  seats_available: number;
  application_deadline: string;
  description: string;
  requirements: string[];
}

const AdmissionsSection = () => {
  const [programs, setPrograms] = useState<AdmissionProgram[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<AdmissionProgram[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    const filtered = programs.filter(
      (program) =>
        program.program_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPrograms(filtered);
  }, [searchQuery, programs]);

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("admissions_info")
      .select("*")
      .order("program_name", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading programs",
        description: error.message,
      });
    } else {
      setPrograms(data || []);
      setFilteredPrograms(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading admission information...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Admissions 2025</h2>
        <p className="text-muted-foreground">Explore our programs and start your application</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search programs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {program.program_name}
                  </CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </div>
                {program.seats_available > 0 && (
                  <Badge variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    {program.seats_available} seats
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                  <p className="font-medium">{program.eligibility}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">{program.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fee Structure</p>
                  <p className="font-medium">{program.fee_structure}</p>
                </div>
              </div>

              {program.application_deadline && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Application Deadline: {format(new Date(program.application_deadline), "MMMM dd, yyyy")}</span>
                </div>
              )}

              {program.requirements.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Required Documents:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {program.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button className="flex-1">Apply Now</Button>
                <Button variant="outline" className="flex-1">Download Brochure</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No programs found matching your search</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdmissionsSection;
