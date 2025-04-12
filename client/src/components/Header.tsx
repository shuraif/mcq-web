import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export default function Header() {
  // In a real application, we would get user data from a context or Redux store
  const userName = "John Doe"; // For demonstration purposes

  const handleLogout = () => {
    // In a real application, we would handle logout functionality here
    console.log("Logout clicked");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg 
            className="h-6 w-6 text-secondary" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
          <h1 className="font-semibold text-xl">MCQ Exam Platform</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline-flex items-center text-slate-600">
            <User className="h-4 w-4 mr-1" />
            <span>{userName}</span>
          </span>
          <Button 
            size="sm" 
            variant="default" 
            onClick={handleLogout}
            className="bg-secondary hover:bg-indigo-600"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
