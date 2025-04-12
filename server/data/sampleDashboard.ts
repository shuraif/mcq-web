import { 
  LeaderboardEntry, 
  PerformanceStats,
  ExamAnalytics 
} from "../../client/src/types";
import { sampleExams } from "./sampleExams";

// Sample leaderboard data
export const sampleLeaderboard: LeaderboardEntry[] = [
  {
    userId: "user-1",
    username: "Alice Johnson",
    score: 92,
    completionTime: 1800, // 30 minutes
    examId: "1",
    examTitle: "JavaScript Fundamentals",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    userId: "user-2",
    username: "Bob Smith",
    score: 85,
    completionTime: 2100, // 35 minutes
    examId: "2",
    examTitle: "React Essentials",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    userId: "user-3",
    username: "Charlie Brown",
    score: 78,
    completionTime: 1920, // 32 minutes
    examId: "1",
    examTitle: "JavaScript Fundamentals",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    userId: "user-4",
    username: "Diana Prince",
    score: 95,
    completionTime: 1680, // 28 minutes
    examId: "3",
    examTitle: "Node.js Advanced",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    userId: "user-5",
    username: "Ethan Hunt",
    score: 72,
    completionTime: 2220, // 37 minutes
    examId: "2",
    examTitle: "React Essentials",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    userId: "user-6",
    username: "Fiona Gallagher",
    score: 88,
    completionTime: 1980, // 33 minutes
    examId: "3",
    examTitle: "Node.js Advanced",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
  },
  {
    userId: "user-7",
    username: "George Lucas",
    score: 81,
    completionTime: 2040, // 34 minutes
    examId: "1",
    examTitle: "JavaScript Fundamentals",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    userId: "user-1",
    username: "Alice Johnson",
    score: 90,
    completionTime: 1860, // 31 minutes
    examId: "3",
    examTitle: "Node.js Advanced",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago
  }
];

// Sample performance stats
export const samplePerformanceStats: PerformanceStats = {
  totalExamsTaken: 15,
  averageScore: 84,
  highestScore: 95,
  totalPassed: 12,
  totalFailed: 3,
  examCountByCategory: {
    "JavaScript": 6,
    "React": 5,
    "Node.js": 4
  },
  scoreByDifficulty: {
    "Easy": 90,
    "Medium": 82,
    "Hard": 71
  }
};

// Sample exam analytics
export const sampleExamAnalytics: ExamAnalytics[] = sampleExams.map((exam) => ({
  examId: exam.id,
  title: exam.title,
  totalAttempts: Math.floor(Math.random() * 15) + 5, // random between 5-20
  averageScore: Math.floor(Math.random() * 30) + 65, // random between 65-95
  passRate: Math.floor(Math.random() * 40) + 60, // random between 60-100
  averageCompletionTime: Math.floor(Math.random() * 1800) + 1200, // random between 20-50 minutes in seconds
  difficultQuestions: exam.questions.slice(0, 3).map(q => ({
    questionId: q.id,
    text: q.text,
    failRate: Math.floor(Math.random() * 60) + 40 // random between 40-100%
  }))
}));