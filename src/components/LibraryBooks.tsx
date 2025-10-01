import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { useState } from "react";

const LibraryBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    {
      title: "Introduction to Computer Science",
      author: "John Smith",
      category: "Computer Science",
      status: "Available",
      copies: 5
    },
    {
      title: "Data Structures and Algorithms",
      author: "Robert Sedgewick",
      category: "Computer Science",
      status: "Available",
      copies: 3
    },
    {
      title: "Financial Accounting Fundamentals",
      author: "Michael Johnson",
      category: "Commerce",
      status: "Issued",
      copies: 0
    },
    {
      title: "Marketing Management",
      author: "Philip Kotler",
      category: "Management",
      status: "Available",
      copies: 4
    },
    {
      title: "Business Communication",
      author: "Mary Ellen Guffey",
      category: "Management",
      status: "Available",
      copies: 6
    },
    {
      title: "Principles of Economics",
      author: "N. Gregory Mankiw",
      category: "Commerce",
      status: "Available",
      copies: 2
    },
    {
      title: "Database Management Systems",
      author: "Raghu Ramakrishnan",
      category: "Computer Science",
      status: "Issued",
      copies: 0
    },
    {
      title: "Corporate Finance",
      author: "Ross Westerfield",
      category: "Commerce",
      status: "Available",
      copies: 3
    },
    {
      title: "Organizational Behavior",
      author: "Stephen Robbins",
      category: "Management",
      status: "Available",
      copies: 5
    },
    {
      title: "Web Development with React",
      author: "Alex Banks",
      category: "Computer Science",
      status: "Available",
      copies: 4
    },
    {
      title: "Cost and Management Accounting",
      author: "Charles Horngren",
      category: "Commerce",
      status: "Issued",
      copies: 0
    },
    {
      title: "Human Resource Management",
      author: "Gary Dessler",
      category: "Management",
      status: "Available",
      copies: 3
    }
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Library - Available Books</h2>
        <p className="text-muted-foreground">Browse our collection of books and resources</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, author, or subject..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book, i) => (
          <Card key={i} className={book.status === "Available" ? "border-primary/30" : ""}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <BookOpen className="h-6 w-6 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                  <CardDescription className="mt-1">by {book.author}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{book.category}</Badge>
                {book.status === "Available" ? (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-500/10 text-red-600">
                    Issued
                  </Badge>
                )}
              </div>
              
              {book.status === "Available" && (
                <div className="text-sm text-muted-foreground">
                  {book.copies} {book.copies === 1 ? 'copy' : 'copies'} available
                </div>
              )}

              <Button 
                className="w-full" 
                disabled={book.status === "Issued"}
              >
                {book.status === "Available" ? "Request Book" : "Currently Unavailable"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Library Information</CardTitle>
          <CardDescription>
            Visit the library to borrow books or get assistance from our librarian.
            <br />
            <strong className="text-foreground">Hours:</strong> Mon-Fri, 9 AM - 5 PM | Sat, 10 AM - 2 PM
            <br />
            <strong className="text-foreground">Location:</strong> Ground Floor, Main Building
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LibraryBooks;