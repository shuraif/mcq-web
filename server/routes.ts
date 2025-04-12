import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sampleExams, sampleExamTaken, sampleExamResult } from "./data/sampleExams";
import { sampleLeaderboard, samplePerformanceStats, sampleExamAnalytics } from "./data/sampleDashboard";
import { ExamSubmission } from "../client/src/types";

// In-memory storage for active exams and results
const activeExams = new Map<string, any>();
const examResults = new Map<string, any>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all available exams
  app.get('/api/exams', (req, res) => {
    try {
      res.json(sampleExams);
    } catch (error) {
      console.error('Error fetching exams:', error);
      res.status(500).json({ message: 'Failed to fetch exams' });
    }
  });

  // Get a specific exam by ID
  app.get('/api/exams/:examId', (req, res) => {
    try {
      const { examId } = req.params;
      const exam = sampleExams.find(e => e.id === examId);
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      res.json(exam);
    } catch (error) {
      console.error('Error fetching exam:', error);
      res.status(500).json({ message: 'Failed to fetch exam' });
    }
  });

  // Start an exam
  app.post('/api/exams/:examId/start', (req, res) => {
    try {
      const { examId } = req.params;
      const exam = sampleExams.find(e => e.id === examId);
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      // Create a new exam session
      const examTaken = {
        ...sampleExamTaken,
        examId,
        startTime: new Date().toISOString()
      };
      
      // Store in our active exams
      activeExams.set(examId, examTaken);
      
      res.json(examTaken);
    } catch (error) {
      console.error('Error starting exam:', error);
      res.status(500).json({ message: 'Failed to start exam' });
    }
  });

  // Submit an exam
  app.post('/api/exams/:examId/submit', (req, res) => {
    try {
      const { examId } = req.params;
      const submission: ExamSubmission = req.body;
      const exam = sampleExams.find(e => e.id === examId);
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      // In a real application, we would calculate the actual score
      // For this demo, we'll use our sample result but adjust the exam ID
      const result = {
        ...sampleExamResult,
        examId,
        userAnswers: submission.answers,
        // Simulate different scores based on the number of answers
        score: submission.answers.length / exam.totalQuestions,
        correctAnswers: submission.answers.length,
        incorrectAnswers: exam.totalQuestions - submission.answers.length
      };
      
      // Adjust passed status based on the calculated score
      result.passed = (result.score * 100) >= exam.passingScore;
      
      // Store the result
      examResults.set(examId, result);
      
      // Mark the exam as completed
      if (activeExams.has(examId)) {
        const examTaken = activeExams.get(examId);
        activeExams.set(examId, {
          ...examTaken,
          status: 'completed',
          endTime: new Date().toISOString()
        });
      }
      
      res.json(result);
    } catch (error) {
      console.error('Error submitting exam:', error);
      res.status(500).json({ message: 'Failed to submit exam' });
    }
  });

  // Get exam result
  app.get('/api/exams/:examId/result', (req, res) => {
    try {
      const { examId } = req.params;
      
      // Check if we have a stored result
      if (examResults.has(examId)) {
        return res.json(examResults.get(examId));
      }
      
      // If no stored result, return the sample result with adjusted ID
      const exam = sampleExams.find(e => e.id === examId);
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      const result = {
        ...sampleExamResult,
        examId
      };
      
      res.json(result);
    } catch (error) {
      console.error('Error fetching exam result:', error);
      res.status(500).json({ message: 'Failed to fetch exam result' });
    }
  });

  // Dashboard API endpoints
  
  // Get global leaderboard
  app.get('/api/dashboard/leaderboard', (req, res) => {
    try {
      // Sort by score in descending order
      const sortedLeaderboard = [...sampleLeaderboard].sort((a, b) => b.score - a.score);
      res.json(sortedLeaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
  });

  // Get leaderboard for a specific exam
  app.get('/api/dashboard/leaderboard/:examId', (req, res) => {
    try {
      const { examId } = req.params;
      
      // Filter for the specific exam and sort by score
      const filteredLeaderboard = sampleLeaderboard
        .filter(entry => entry.examId === examId)
        .sort((a, b) => b.score - a.score);
      
      res.json(filteredLeaderboard);
    } catch (error) {
      console.error('Error fetching exam leaderboard:', error);
      res.status(500).json({ message: 'Failed to fetch exam leaderboard' });
    }
  });

  // Get performance statistics
  app.get('/api/dashboard/performance', (req, res) => {
    try {
      res.json(samplePerformanceStats);
    } catch (error) {
      console.error('Error fetching performance stats:', error);
      res.status(500).json({ message: 'Failed to fetch performance stats' });
    }
  });

  // Get analytics for a specific exam
  app.get('/api/dashboard/analytics/:examId', (req, res) => {
    try {
      const { examId } = req.params;
      
      // Find the exam analytics
      const examAnalytics = sampleExamAnalytics.find(a => a.examId === examId);
      
      if (!examAnalytics) {
        return res.status(404).json({ message: 'Exam analytics not found' });
      }
      
      res.json(examAnalytics);
    } catch (error) {
      console.error('Error fetching exam analytics:', error);
      res.status(500).json({ message: 'Failed to fetch exam analytics' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
