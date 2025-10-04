import FeesDashboard from "@/components/FeesDashboard";

const Fees = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Fee Management</h1>
        <p className="text-muted-foreground">
          View fee deadlines, payment history, and make payments
        </p>
      </div>

      <FeesDashboard />
    </div>
  );
};

export default Fees;
