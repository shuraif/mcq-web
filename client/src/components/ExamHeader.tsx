import { Exam } from "@/types";
import { formatTime, calculateProgress } from "@/lib/utils";
import { Clock, Trophy, ClipboardList } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ExamHeaderProps {
  exam: Exam;
  currentQuestionIndex: number;
  timeRemaining: number;
}

export default function ExamHeader({ exam, currentQuestionIndex, timeRemaining }: ExamHeaderProps) {
  const progress = calculateProgress(currentQuestionIndex, exam.totalQuestions - 1);
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{exam.title}</h2>
          <div className="flex items-center text-slate-600 text-sm flex-wrap gap-y-2">
            <span className="inline-flex items-center mr-4">
              <ClipboardList className="h-4 w-4 mr-1" />
              {exam.totalQuestions} Questions
            </span>
            <span className="inline-flex items-center mr-4">
              <Clock className="h-4 w-4 mr-1" />
              {exam.duration} Minutes
            </span>
            <span className="inline-flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              {exam.passingScore}% Passing
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="bg-white rounded-lg shadow-sm p-3 border border-slate-200">
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">Time Remaining</p>
              <p className="text-xl font-semibold">{formatTime(timeRemaining)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Progress</span>
          <span>{currentQuestionIndex + 1}/{exam.totalQuestions}</span>
        </div>
        <Progress value={progress} className="h-2.5 bg-slate-200" />
      </div>
    </div>
  );
}
