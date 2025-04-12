import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchExamResult, fetchExamById } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trophy, Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Results() {
  const [, params] = useRoute<{ examId: string }>("/results/:examId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const examId = params?.examId || "";
  
  // Fetch exam data
  const { 
    data: exam,
    isLoading: isExamLoading,
  } = useQuery({
    queryKey: ['/exams', examId],
    queryFn: () => fetchExamById(examId),
    enabled: !!examId,
  });

  // Fetch exam results
  const { 
    data: result,
    isLoading: isResultLoading,
    error
  } = useQuery({
    queryKey: ['/exams', examId, 'result'],
    queryFn: () => fetchExamResult(examId),
    enabled: !!examId,
  });
  
  const isLoading = isExamLoading || isResultLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-card p-8 border border-slate-200">
            <div className="text-center mb-6">
              <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            
            <div className="flex justify-center mb-8">
              <Skeleton className="h-48 w-48 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </div>
            
            <Skeleton className="h-24 rounded-lg mb-8" />
            
            <div className="flex justify-center space-x-4">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (error || !result) {
      toast({
        title: "Error",
        description: "Failed to load your exam results. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, result, toast]);

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Results</h2>
        <p className="text-slate-600 mb-6">We couldn't load your exam results. Please try again.</p>
        <Button 
          onClick={() => setLocation("/")}
          className="bg-secondary hover:bg-indigo-600"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  const scorePercent = (result.score * 100).toFixed(0);
  const passedExam = result.passed;
  const strokeDasharray = 264; // Circumference of the circle (2 * pi * radius)
  const strokeDashoffset = strokeDasharray * (1 - result.score);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-card p-8 border border-slate-200">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-600 mb-4">
              <Trophy className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-semibold">Exam Completed!</h2>
            <p className="text-slate-600 mt-1">
              You've successfully completed the {exam?.title || 'exam'}
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              {/* Circle background */}
              <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
              {/* Progress circle */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke={passedExam ? "#22c55e" : "#ef4444"} 
                  strokeWidth="8"
                  strokeLinecap="round" 
                  strokeDasharray={strokeDasharray} 
                  strokeDashoffset={strokeDashoffset} 
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              {/* Score text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{scorePercent}%</span>
                <span className="text-slate-500 text-sm">Your Score</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <p className="text-slate-500 text-sm mb-1">Total Questions</p>
              <p className="text-xl font-semibold">{result.totalQuestions}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <p className="text-slate-500 text-sm mb-1">Correct Answers</p>
              <p className="text-xl font-semibold text-green-600">{result.correctAnswers}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <p className="text-slate-500 text-sm mb-1">Incorrect Answers</p>
              <p className="text-xl font-semibold text-red-500">{result.incorrectAnswers}</p>
            </div>
          </div>
          
          <div className={`${passedExam ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border p-4 rounded-lg mb-8`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {passedExam ? (
                  <CheckCircle className="text-green-600 h-5 w-5" />
                ) : (
                  <XCircle className="text-red-600 h-5 w-5" />
                )}
              </div>
              <div className="ml-3">
                <h4 className={`${passedExam ? 'text-green-800' : 'text-red-800'} font-medium`}>
                  {passedExam ? 'Passed!' : 'Not Passed'}
                </h4>
                <p className={`${passedExam ? 'text-green-700' : 'text-red-700'} text-sm`}>
                  {passedExam 
                    ? `Congratulations! You've passed the exam with a score of ${scorePercent}%. The passing score was ${result.passingScore}%.`
                    : `You've scored ${scorePercent}%, but needed ${result.passingScore}% to pass. Keep practicing and try again!`
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              onClick={() => setLocation(`/exam/${examId}`)}
            >
              Review Answers
            </Button>
            <Button 
              onClick={() => setLocation("/")}
              className="bg-secondary hover:bg-indigo-600"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
