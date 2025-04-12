import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

export function calculateProgress(current: number, total: number): number {
  return (current / total) * 100;
}

export function getQuestionStatus(
  questionIndex: number, 
  currentIndex: number, 
  answeredQuestions: Set<string>
): 'current' | 'answered' | 'unanswered' {
  if (questionIndex === currentIndex) return 'current';
  if (answeredQuestions.has(questionIndex.toString())) return 'answered';
  return 'unanswered';
}
