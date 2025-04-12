import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchExamById, startExam, submitExam } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Exam as ExamType, UserAnswer } from "@/types";
import ExamHeader from "@/components/ExamHeader";
import QuestionSection from "@/components/QuestionSection";
import NavigationControls from "@/components/NavigationControls";
import QuestionNavigator from "@/components/QuestionNavigator";
import ReviewModal from "@/components/ReviewModal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Exam() {
  const [, params] = useRoute<{ examId: string }>("/exam/:examId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const examId = params?.examId || "";
  
  const [examTakenId, setExamTakenId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // Fetch exam data
  const { 
    data: exam,
    isLoading,
    error
  } = useQuery({
    queryKey: ['/exams', examId],
    queryFn: () => fetchExamById(examId),
    enabled: !!examId,
  });

  // Start exam
  const startExamMutation = useMutation({
    mutationFn: () => startExam(examId),
    onSuccess: (data) => {
      setExamTakenId(data.id);
      // Set timer based on exam duration
      if (exam) {
        setTimeRemaining(exam.duration * 60);
      }
    },
    onError: (error) => {
      toast({
        title: "Error starting exam",
        description: "Failed to start the exam. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Submit exam
  const submitExamMutation = useMutation({
    mutationFn: (answers: UserAnswer[]) => submitExam({
      examId,
      answers,
    }),
    onSuccess: (data) => {
      setLocation(`/results/${examId}`);
    },
    onError: (error) => {
      toast({
        title: "Error submitting exam",
        description: "Failed to submit your answers. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Initialize exam when data is loaded
  useEffect(() => {
    if (exam && !examTakenId) {
      startExamMutation.mutate();
    }
  }, [exam, examTakenId, startExamMutation]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0 || !examTakenId) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, examTakenId]);

  const handleOptionSelect = useCallback((optionId: string) => {
    if (!exam) return;
    
    const currentQuestion = exam.questions[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  }, [exam, currentQuestionIndex]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    if (!exam) return;
    
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsReviewModalOpen(true);
    }
  }, [currentQuestionIndex, exam]);

  const handleQuestionSelect = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
  }, []);

  const handleFinishExam = useCallback(() => {
    setIsReviewModalOpen(true);
  }, []);

  const handleSubmitExam = useCallback(() => {
    if (!exam) return;
    
    const answersArray = Object.entries(userAnswers).map(([questionId, selectedOptionId]) => ({
      questionId,
      selectedOptionId,
    }));
    
    submitExamMutation.mutate(answersArray);
  }, [exam, userAnswers, submitExamMutation]);

  // Calculate answered questions for the navigator
  const answeredQuestions = new Set(
    Object.keys(userAnswers).map((questionId) => {
      if (!exam) return "-1";
      const index = exam.questions.findIndex((q) => q.id === questionId);
      return index.toString();
    }).filter(index => index !== "-1")
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] container mx-auto px-4 py-8">
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600">Loading your exam...</p>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Exam</h2>
        <p className="text-slate-600 mb-6">We couldn't load the exam you requested. Please try again.</p>
        <button 
          className="px-4 py-2 bg-secondary text-white rounded-md"
          onClick={() => setLocation("/")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const selectedOption = currentQuestion ? userAnswers[currentQuestion.id] || null : null;

  return (
    <div className="flex flex-col md:flex-row container mx-auto px-4 py-8">
      <main className="flex-1 mr-0 md:mr-8">
        <ExamHeader 
          exam={exam}
          currentQuestionIndex={currentQuestionIndex}
          timeRemaining={timeRemaining}
        />

        {currentQuestion ? (
          <QuestionSection
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-card p-6 mb-6 border border-slate-200">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        )}
        
        <NavigationControls
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === exam.questions.length - 1}
        />
      </main>
      
      <aside className="w-full md:w-64 lg:w-80 mt-8 md:mt-0">
        <QuestionNavigator
          totalQuestions={exam.questions.length}
          currentQuestionIndex={currentQuestionIndex}
          answeredQuestions={answeredQuestions}
          onQuestionSelect={handleQuestionSelect}
          onFinishExam={handleFinishExam}
        />
      </aside>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleSubmitExam}
        exam={exam}
        userAnswers={userAnswers}
        onQuestionClick={(index) => {
          setCurrentQuestionIndex(index);
          setIsReviewModalOpen(false);
        }}
      />
    </div>
  );
}
