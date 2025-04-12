import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export default function NavigationControls({ 
  onPrevious, 
  onNext, 
  isFirstQuestion, 
  isLastQuestion 
}: NavigationControlsProps) {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Previous
      </Button>
      
      <Button
        onClick={onNext}
        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-indigo-600"
      >
        {isLastQuestion ? "Finish" : "Next"}
        {!isLastQuestion && <ArrowRight className="ml-1 h-4 w-4" />}
      </Button>
    </div>
  );
}
