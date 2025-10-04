import CourseCatalog from "@/components/CourseCatalog";

const Courses = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Course Catalog</h1>
        <p className="text-muted-foreground">
          Explore all available courses and programs offered by LN College
        </p>
      </div>

      <CourseCatalog />
    </div>
  );
};

export default Courses;
