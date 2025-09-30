import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Calendar, DollarSign, FileText, Download } from "lucide-react";

const ScholarshipsSection = () => {
  const scholarships = [
    {
      name: "Merit-Based Excellence Scholarship",
      amount: "$5,000 per year",
      deadline: "April 15, 2025",
      eligibility: [
        "GPA above 3.5",
        "Full-time undergraduate student",
        "Enrolled in STEM programs"
      ],
      benefits: "Full tuition coverage for 4 years",
      renewable: true,
      documents: ["Transcript", "Letter of Recommendation", "Essay"],
      status: "Open"
    },
    {
      name: "Financial Need Grant",
      amount: "$3,000 per semester",
      deadline: "March 30, 2025",
      eligibility: [
        "Demonstrated financial need",
        "US citizen or permanent resident",
        "Minimum GPA 2.5"
      ],
      benefits: "Direct payment towards tuition fees",
      renewable: true,
      documents: ["FAFSA", "Income proof", "Student ID"],
      status: "Open"
    },
    {
      name: "Athletic Scholarship Program",
      amount: "Up to $10,000",
      deadline: "February 28, 2025",
      eligibility: [
        "Active in college sports teams",
        "Minimum GPA 3.0",
        "Coach recommendation required"
      ],
      benefits: "Tuition waiver + training stipend",
      renewable: true,
      documents: ["Sports resume", "Coach letter", "Medical clearance"],
      status: "Closing Soon"
    },
    {
      name: "Diversity & Inclusion Scholarship",
      amount: "$2,500",
      deadline: "May 1, 2025",
      eligibility: [
        "Underrepresented minorities",
        "First-generation college students",
        "Minimum GPA 2.8"
      ],
      benefits: "One-time award + mentorship program",
      renewable: false,
      documents: ["Personal statement", "Academic records"],
      status: "Open"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Scholarships & Financial Aid</h2>
        <p className="text-muted-foreground">Explore funding opportunities for your education</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {scholarships.map((scholarship, i) => (
          <Card key={i} className="relative">
            {scholarship.status === "Closing Soon" && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive">Closing Soon</Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-start gap-3">
                <Award className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-primary mt-1">
                    {scholarship.amount}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm p-3 bg-accent rounded-lg">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Deadline:</span>
                <span>{scholarship.deadline}</span>
              </div>

              <div>
                <p className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Eligibility Criteria:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {scholarship.eligibility.map((criteria, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Benefits:
                </p>
                <p className="text-sm text-muted-foreground">{scholarship.benefits}</p>
                {scholarship.renewable && (
                  <Badge variant="secondary" className="mt-2">Renewable Annually</Badge>
                )}
              </div>

              <div>
                <p className="font-medium mb-2 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Required Documents:
                </p>
                <div className="flex flex-wrap gap-2">
                  {scholarship.documents.map((doc, j) => (
                    <Badge key={j} variant="outline">{doc}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">Apply Now</Button>
                <Button variant="outline">Download Form</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Need Help with Applications?</CardTitle>
          <CardDescription>
            Visit the Financial Aid Office for personalized guidance on scholarships and grants.
            <br />
            <strong className="text-foreground">Hours:</strong> Mon-Fri, 9 AM - 5 PM | <strong className="text-foreground">Location:</strong> Admin Building, Room 102
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ScholarshipsSection;
