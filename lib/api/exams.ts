import { fetchWithTimeout } from './base';
import { ApiResponse } from './types';

export interface Answer {
  id: string;
  content: string;
}

export interface Question {
  id: string;
  content: string;
  type: string;
  score: number;
  answers: Answer[];
}

export interface ExamDetail {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  questions: Question[];
}

export interface ExamListItem {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
}

export interface SubmitExamReq {
  answers: Record<string, string>;
}

export interface SubmitExamRes {
  correctCount: number;
  totalCount: number;
  score: number;
  results?: Record<string, boolean>;
  correctAnswers?: Record<string, string>;
}

/**
 * Get auth headers helper
 */
function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('accessToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

/**
 * Get list of active exams
 */
export async function getExams(): Promise<ApiResponse<ExamListItem[]>> {
  return fetchWithTimeout<ExamListItem[]>('/api/v1/exams/active');
}

/**
 * Get exam details by ID
 */
export async function getExamDetail(id: string): Promise<ApiResponse<ExamDetail>> {
  return fetchWithTimeout<ExamDetail>(`/api/v1/exams/${id}`, {
    headers: getAuthHeaders()
  });
}

/**
 * Submit exam answers
 */
export async function submitExam(id: string, req: SubmitExamReq): Promise<ApiResponse<SubmitExamRes>> {
  return fetchWithTimeout<SubmitExamRes>(`/api/v1/exams/${id}/submit`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders()
    },
    body: JSON.stringify(req)
  });
}
