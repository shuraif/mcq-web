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
