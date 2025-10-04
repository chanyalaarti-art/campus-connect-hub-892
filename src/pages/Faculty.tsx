import FacultyDirectory from "@/components/FacultyDirectory";

const Faculty = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Faculty Directory</h1>
        <p className="text-muted-foreground">
          Meet our dedicated team of professors and instructors
        </p>
      </div>

      <FacultyDirectory />
    </div>
  );
};

export default Faculty;
