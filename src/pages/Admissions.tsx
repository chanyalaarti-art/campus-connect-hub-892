import AdmissionsSection from "@/components/AdmissionsSection";

const Admissions = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Admissions 2025</h1>
        <p className="text-muted-foreground">
          Discover our programs and begin your application journey
        </p>
      </div>

      <AdmissionsSection />
    </div>
  );
};

export default Admissions;
