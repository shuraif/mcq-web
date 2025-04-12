import { Button } from "@/components/ui/button";
import { cn, getQuestionStatus } from "@/lib/utils";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answeredQuestions: Set<string>;
  onQuestionSelect: (index: number) => void;
  onFinishExam: () => void;
}

export default function QuestionNavigator({
  totalQuestions,
  currentQuestionIndex,
  answeredQuestions,
  onQuestionSelect,
  onFinishExam
}: QuestionNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleNavigator = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Question Navigation Drawer Toggle */}
      {isMobile && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-4 z-10">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
            onClick={toggleNavigator}
          >
            <svg 
              className="h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M8 2h8" />
              <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
              <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
            </svg>
            <span>Question Navigator</span>
          </Button>
        </div>
      )}

      {/* Question Navigator */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 z-20 overflow-y-auto md:block md:static md:transform-none md:shadow-none md:p-0 md:w-auto md:z-auto",
          isMobile ? (isOpen ? "transform-none" : "transform translate-x-full") : "",
          "transition-transform duration-300"
        )}
      >
        <div className="md:sticky md:top-24">
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h3 className="font-semibold text-lg">Questions</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-500 hover:text-slate-700 p-1 h-auto"
              onClick={toggleNavigator}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="hidden md:block mb-4">
            <h3 className="font-semibold text-lg">Questions</h3>
          </div>
          
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const status = getQuestionStatus(
                index,
                currentQuestionIndex,
                answeredQuestions
              );
              
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-10 w-10 p-0 flex items-center justify-center",
                    status === 'current' && "bg-secondary text-white border-secondary hover:bg-secondary/90 hover:text-white",
                    status === 'answered' && "border-green-500 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700",
                    status === 'unanswered' && "border-slate-300 hover:border-secondary"
                  )}
                  onClick={() => onQuestionSelect(index)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
          
          <div className="mt-6 flex flex-col space-y-2">
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 rounded-sm bg-secondary mr-2"></div>
              <span>Current Question</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 rounded-sm border border-green-500 bg-green-50 mr-2"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 rounded-sm border border-slate-300 mr-2"></div>
              <span>Unanswered</span>
            </div>
          </div>
          
          <div className="mt-8 md:mt-10">
            <Button
              className="w-full py-2.5 px-4 bg-accent hover:bg-violet-600 text-white rounded-md font-medium transition-colors"
              onClick={onFinishExam}
            >
              Finish Exam
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
