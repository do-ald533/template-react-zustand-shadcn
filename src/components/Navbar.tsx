import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-background/60 backdrop-blur sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Book Manager
          </Link>
          <div className="space-x-4">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/books">
              <Button variant="ghost">Books</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
