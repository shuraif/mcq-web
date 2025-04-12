import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Exam, UserAnswer } from "@/types";
import { cn } from "@/lib/utils";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  exam: Exam;
  userAnswers: Record<string, string>; // questionId -> selectedOptionId
  onQuestionClick: (index: number) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  exam,
  userAnswers,
  onQuestionClick
}: ReviewModalProps) {
  if (!isOpen) return null;

  const answeredCount = Object.keys(userAnswers).length;
  const skippedCount = exam.totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Review Your Answers</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-500 hover:text-slate-700 p-1 h-auto"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <p className="mb-4 text-slate-600">
            Please review your answers before submitting. You have answered{" "}
            <span className="font-semibold text-secondary">
              {answeredCount}/{exam.totalQuestions}
            </span>{" "}
            questions.
          </p>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Question Summary</h4>
            <div className="grid grid-cols-5 gap-3">
              {exam.questions.map((question, index) => {
                const isAnswered = userAnswers[question.id] !== undefined;
                
                return (
                  <Button
                    key={question.id}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-10 w-10 p-0 flex items-center justify-center",
                      isAnswered 
                        ? "border-green-500 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700" 
                        : "border-orange-400 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700"
                    )}
                    onClick={() => onQuestionClick(index)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 mb-6">
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 rounded-sm border border-green-500 bg-green-50 mr-2"></div>
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 rounded-sm border border-orange-400 bg-orange-50 mr-2"></div>
              <span>Skipped ({skippedCount})</span>
            </div>
          </div>
          
          <div className="flex space-x-3 justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="py-2 px-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300"
            >
              Continue Exam
            </Button>
            <Button 
              onClick={onSubmit}
              className="py-2 px-4 bg-secondary hover:bg-indigo-600 text-white"
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
