export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  difficulty: string;
  code?: string;
}

export interface Exam {
  id: string;
  title: string;
  description?: string;
  totalQuestions: number;
  duration: number; // in minutes
  passingScore: number; // percentage
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
}

export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  passed: boolean;
  passingScore: number;
  userAnswers: UserAnswer[];
}

export interface ExamTaken {
  id: string;
  userId: string;
  examId: string;
  startTime: string;
  endTime?: string;
  status: 'in-progress' | 'completed';
  score?: number;
}

export interface ExamSubmission {
  examId: string;
  answers: UserAnswer[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  completionTime: number; // in seconds
  examId: string;
  examTitle: string;
  date: string;
}

export interface PerformanceStats {
  totalExamsTaken: number;
  averageScore: number;
  highestScore: number;
  totalPassed: number;
  totalFailed: number;
  examCountByCategory: Record<string, number>;
  scoreByDifficulty: Record<string, number>;
}

export interface ExamAnalytics {
  examId: string;
  title: string;
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  averageCompletionTime: number; // in seconds
  difficultQuestions: {
    questionId: string;
    text: string;
    failRate: number;
  }[];
}
