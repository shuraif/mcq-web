import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchAvailableExams } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Clock, Trophy, ClipboardList } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const { data: exams, isLoading, error } = useQuery({
    queryKey: ['/exams'],
    queryFn: fetchAvailableExams,
    retry: 3,
    retryDelay: 1000
  });

  useEffect(() => {
    if (error) {
      console.error("Handling error in useEffect:", error);
      toast({
        title: "Error",
        description: "Failed to load available exams. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleStartExam = (examId: string) => {
    console.log(`Starting exam with ID: ${examId}`);
    setLocation(`/exam/${examId}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Available Exams</h1>
          <p className="text-slate-600">Select an exam to start testing your knowledge</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams?.map((exam) => (
              <Card key={exam.id} className="shadow-sm border border-slate-200 hover:border-secondary transition-colors duration-200">
                <CardHeader className="pb-2">
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription>{exam.description || 'Test your knowledge with this exam'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex text-slate-600 text-sm mt-2 justify-between">
                    <span className="inline-flex items-center">
                      <ClipboardList className="h-4 w-4 mr-1" />
                      {exam.totalQuestions} Questions
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {exam.duration} Minutes
                    </span>
                    <span className="inline-flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      {exam.passingScore}% Passing
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <a href={`/exam/${exam.id}`}>
                    <Button 
                      variant="default"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleStartExam(exam.id);
                      }}
                    >
                      Start Exam
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {exams?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No Exams Available</h3>
            <p className="text-slate-600">Please check back later for new exams.</p>
          </div>
        )}
      </div>
    </main>
  );
}
