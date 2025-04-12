import { Question, UserAnswer } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuestionSectionProps {
  question: Question;
  questionIndex: number;
  selectedOption: string | null;
  onOptionSelect: (optionId: string) => void;
}

export default function QuestionSection({ 
  question, 
  questionIndex, 
  selectedOption, 
  onOptionSelect 
}: QuestionSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 mb-6 border border-slate-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Question {questionIndex + 1}</h3>
        <div className={cn(
          "flex items-center space-x-1 text-sm px-2 py-1 rounded",
          question.difficulty === "Easy" ? "bg-green-50" : 
          question.difficulty === "Medium" ? "bg-slate-100" : 
          "bg-orange-50"
        )}>
          <div className={cn(
            "w-2 h-2 rounded-full mr-1",
            question.difficulty === "Easy" ? "bg-green-500" : 
            question.difficulty === "Medium" ? "bg-secondary" : 
            "bg-orange-500"
          )} />
          <span className="font-medium">{question.difficulty}</span>
        </div>
      </div>
      
      {/* Question Content */}
      <div className="mb-6">
        <p className="text-slate-800 mb-4">{question.text}</p>
        
        {/* Code Block (if applicable) */}
        {question.code && (
          <div className="bg-slate-800 text-slate-50 p-4 rounded-md mb-4 font-mono text-sm overflow-x-auto">
            <pre>{question.code}</pre>
          </div>
        )}
      </div>
      
      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.id}
            className={cn(
              "flex items-start p-4 rounded-lg border cursor-pointer transition-all duration-200",
              selectedOption === option.id 
                ? "border-blue-500 bg-blue-50 shadow-sm" 
                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
            )}
            onClick={() => onOptionSelect(option.id)}
          >
            <div className={cn(
              "flex justify-center items-center w-5 h-5 rounded-full border transition-colors",
              selectedOption === option.id 
                ? "border-blue-500 bg-blue-500" 
                : "border-slate-300 bg-white"
            )}>
              {selectedOption === option.id && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div className="ml-3 font-normal">
              {option.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
