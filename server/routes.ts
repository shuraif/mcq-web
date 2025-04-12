import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Define API proxy routes to the MCQ service
  app.get('/api/exams', async (req, res) => {
    try {
      const response = await fetch('https://mcq-service-abzc.onrender.com/api/exams');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
      res.status(500).json({ message: 'Failed to fetch exams' });
    }
  });

  app.get('/api/exams/:examId', async (req, res) => {
    try {
      const { examId } = req.params;
      const response = await fetch(`https://mcq-service-abzc.onrender.com/api/exams/${examId}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching exam:', error);
      res.status(500).json({ message: 'Failed to fetch exam' });
    }
  });

  app.post('/api/exams/:examId/start', async (req, res) => {
    try {
      const { examId } = req.params;
      const response = await fetch(`https://mcq-service-abzc.onrender.com/api/exams/${examId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error starting exam:', error);
      res.status(500).json({ message: 'Failed to start exam' });
    }
  });

  app.post('/api/exams/:examId/submit', async (req, res) => {
    try {
      const { examId } = req.params;
      const response = await fetch(`https://mcq-service-abzc.onrender.com/api/exams/${examId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error submitting exam:', error);
      res.status(500).json({ message: 'Failed to submit exam' });
    }
  });

  app.get('/api/exams/:examId/result', async (req, res) => {
    try {
      const { examId } = req.params;
      const response = await fetch(`https://mcq-service-abzc.onrender.com/api/exams/${examId}/result`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching exam result:', error);
      res.status(500).json({ message: 'Failed to fetch exam result' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
