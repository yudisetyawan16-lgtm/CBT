export interface CompletedStudentRecord {
  name: string;
  studentClass: string;
  absentNumber: string;
  score: number;
  submittedAt: string;
}

const STORAGE_KEY = 'cbt_pancasila_submitted_students_v1';

export function getCompletedStudents(): CompletedStudentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading completed students from localStorage', err);
    return [];
  }
}

export function checkStudentHasSubmitted(name: string): CompletedStudentRecord | null {
  if (!name) return null;
  const list = getCompletedStudents();
  const normalized = name.trim().toLowerCase();
  const found = list.find((item) => item.name.trim().toLowerCase() === normalized);
  return found || null;
}

export function saveStudentSubmission(record: CompletedStudentRecord): void {
  try {
    const list = getCompletedStudents();
    const normalized = record.name.trim().toLowerCase();
    const existingIndex = list.findIndex((item) => item.name.trim().toLowerCase() === normalized);

    if (existingIndex >= 0) {
      list[existingIndex] = record;
    } else {
      list.push(record);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving completed student to localStorage', err);
  }
}
