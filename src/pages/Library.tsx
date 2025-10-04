import { useNavigate } from "react-router-dom";
import { BookOpen, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LibraryBooks from "@/components/LibraryBooks";

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Library</h1>
          <p className="text-muted-foreground">
            Browse available books and manage your requests
          </p>
        </div>
        <Button onClick={() => navigate("/library/request")} className="gap-2">
          <Plus className="h-4 w-4" />
          Request Book
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Total Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5,000+</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Available Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3,200+</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              New Arrivals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">120</p>
          </CardContent>
        </Card>
      </div>

      <LibraryBooks />
    </div>
  );
};

export default Library;
