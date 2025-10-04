import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface FeeDeadline {
  id: string;
  title: string;
  amount: number;
  due_date: string;
  late_fee: number;
  description: string;
  applicable_to: string[];
}

const FeesDashboard = () => {
  const [fees, setFees] = useState<FeeDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    const { data, error } = await supabase
      .from("fee_deadlines")
      .select("*")
      .order("due_date", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading fees",
        description: error.message,
      });
    } else {
      setFees(data || []);
    }
    setLoading(false);
  };

  const getDeadlineStatus = (dueDate: string) => {
    const now = new Date();
    const deadline = new Date(dueDate);
    const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { status: "overdue", color: "destructive", icon: AlertCircle };
    if (daysUntil <= 7) return { status: "urgent", color: "warning", icon: Clock };
    return { status: "upcoming", color: "default", icon: Calendar };
  };

  if (loading) {
    return <div className="text-center py-8">Loading fee information...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Fee Information</h2>
        <p className="text-muted-foreground">View upcoming fee deadlines and payment details</p>
      </div>

      <div className="grid gap-4">
        {fees.map((fee) => {
          const { status, color, icon: Icon } = getDeadlineStatus(fee.due_date);
          const isPaid = false; // This would be checked against fee_payments table

          return (
            <Card key={fee.id} className="border-l-4" style={{ borderLeftColor: status === "overdue" ? "hsl(var(--destructive))" : status === "urgent" ? "hsl(var(--warning))" : "hsl(var(--primary))" }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {fee.title}
                      {isPaid && (
                        <Badge variant="outline" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Paid
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{fee.description}</CardDescription>
                  </div>
                  <Badge variant={color as any}>
                    <Icon className="h-3 w-3 mr-1" />
                    {status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold">₹{fee.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="text-lg font-semibold">{format(new Date(fee.due_date), "MMM dd, yyyy")}</p>
                  </div>
                </div>
                
                {fee.late_fee > 0 && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    Late fee: ₹{fee.late_fee.toLocaleString()} after due date
                  </div>
                )}

                {!isPaid && (
                  <Button className="w-full">Pay Now</Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {fees.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No upcoming fee deadlines</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeesDashboard;
