import axios from 'axios';
import { Exam, ExamResult, ExamSubmission, ExamTaken } from '@/types';

// Use our local server instead of the external API
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAvailableExams = async (): Promise<Exam[]> => {
  const response = await api.get('/exams');
  return response.data;
};

export const fetchExamById = async (examId: string): Promise<Exam> => {
  const response = await api.get(`/exams/${examId}`);
  return response.data;
};

export const startExam = async (examId: string): Promise<ExamTaken> => {
  const response = await api.post(`/exams/${examId}/start`);
  return response.data;
};

export const submitExam = async (submission: ExamSubmission): Promise<ExamResult> => {
  const response = await api.post(`/exams/${submission.examId}/submit`, submission);
  return response.data;
};

export const fetchExamResult = async (examId: string): Promise<ExamResult> => {
  const response = await api.get(`/exams/${examId}/result`);
  return response.data;
};

export default api;
