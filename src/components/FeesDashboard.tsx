import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

const FeesDashboard = () => {
  const feeData = [
    { 
      semester: "Spring 2025", 
      amount: "$5,500", 
      dueDate: "March 15, 2025", 
      status: "upcoming",
      breakdown: { tuition: "$4,000", hostel: "$1,000", library: "$300", misc: "$200" }
    },
    { 
      semester: "Fall 2024", 
      amount: "$5,500", 
      dueDate: "Paid on Sep 10, 2024", 
      status: "paid" 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Fee Information</h2>
        <p className="text-muted-foreground">Manage your tuition and fee payments</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feeData.map((fee, i) => (
          <Card key={i} className={fee.status === "upcoming" ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{fee.semester}</CardTitle>
                {fee.status === "paid" ? (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Paid
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <Clock className="h-3 w-3 mr-1" />
                    Due Soon
                  </Badge>
                )}
              </div>
              <CardDescription className="text-2xl font-bold text-foreground">
                {fee.amount}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{fee.dueDate}</p>
              </div>
              {fee.breakdown && (
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-sm font-medium">Breakdown:</p>
                  {Object.entries(fee.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              {fee.status === "upcoming" && (
                <Button className="w-full">Pay Now</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Late Fee Policy</CardTitle>
              <CardDescription className="mt-2">
                A late fee of $100 will be charged if payment is not received by the due date. 
                Extensions may be requested through the finance office.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default FeesDashboard;
