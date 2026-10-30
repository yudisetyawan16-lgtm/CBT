export interface StudentUser {
  name: string;
  studentClass: string;
  absentNumber: string;
  loginTime: string;
}

export type QuestionStatus = 'active' | 'answered' | 'doubtful' | 'unanswered';

// For Single Choice: selected option key ('A' | 'B' | 'C' | 'D' | 'E' | null)
// For Complex Choice: array of selected statement IDs
// For Matching: record of leftId -> selected rightId
export type StudentAnswer = string | string[] | Record<string, string> | null;

export interface ExamResult {
  student: StudentUser;
  totalScore: number;
  totalQuestions: number;
  correctCount: number;
  unansweredCount: number;
  doubtfulCount: number;
  submittedAt: string;
  submissionStatus: 'idle' | 'sending' | 'success' | 'error';
  submissionMessage?: string;
  questionScores: {
    questionId: number;
    score: number;
    maxScore: number;
    isCorrect: boolean;
  }[];
}
