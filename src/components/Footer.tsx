import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-8 bg-muted/30 mt-auto">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/admissions" className="hover:text-foreground transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-foreground transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-foreground transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Academic</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/library" className="hover:text-foreground transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link to="/exams" className="hover:text-foreground transition-colors">
                  Exams & Results
                </Link>
              </li>
              <li>
                <Link to="/assignments" className="hover:text-foreground transition-colors">
                  Assignments
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Technical Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                hellolncollege@gmail.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                8655507171 | 8655022625
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Near General Kariappa Bridge, Rajendra Nagar, Borivali East, Mumbai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 LN College. All rights reserved. | Affiliated to University of Mumbai
        </div>
      </div>
    </footer>
  );
};

export default Footer;
