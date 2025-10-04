import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SubmitAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate file upload and submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Assignment submitted!",
        description: "Your assignment has been successfully submitted.",
      });
      navigate("/assignments");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/assignments")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Submit Assignment</h1>
          <p className="text-muted-foreground">
            Upload your completed assignment
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Assignment Submission Form
          </CardTitle>
          <CardDescription>
            Please upload your assignment file and provide any additional comments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Assignment File *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.doc,.docx,.zip"
                  className="cursor-pointer"
                />
              </div>
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <File className="h-4 w-4" />
                  <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, DOC, DOCX, ZIP (Max size: 10MB)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea
                id="comments"
                name="comments"
                placeholder="Any additional notes for your instructor..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="declaration" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="declaration"
                  required
                  className="rounded"
                />
                <span>
                  I declare that this assignment is my own work and has not been plagiarized
                </span>
              </Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Uploading..." : "Submit Assignment"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/assignments")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitAssignment;
