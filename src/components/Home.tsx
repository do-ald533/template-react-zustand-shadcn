import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20">
      <h1 className="text-4xl font-bold mb-8">Welcome to Book Manager</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Manage your books with ease using our powerful book management system
      </p>
      <Link to="/books">
        <Button size="lg">Go to Books</Button>
      </Link>
    </div>
  );
}
