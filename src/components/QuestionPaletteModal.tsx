import React from 'react';
import { StudentAnswer } from '../types';
import { X, CheckCircle, HelpCircle, FileText, ArrowRight } from 'lucide-react';

interface QuestionPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, StudentAnswer>;
  doubtfulMap: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
  onSubmitExam: () => void;
}

export const QuestionPaletteModal: React.FC<QuestionPaletteModalProps> = ({
  isOpen,
  onClose,
  totalQuestions,
  currentIndex,
  answers,
  doubtfulMap,
  onSelectQuestion,
  onSubmitExam,
}) => {
  if (!isOpen) return null;

  // Helper to determine if a question has been answered
  const isAnswered = (questionId: number): boolean => {
    const ans = answers[questionId];
    if (ans === undefined || ans === null) return false;
    if (typeof ans === 'string') return ans.trim().length > 0;
    if (Array.isArray(ans)) return ans.length > 0;
    if (typeof ans === 'object') return Object.keys(ans).length > 0;
    return false;
  };

  const answeredCount = Array.from({ length: totalQuestions }, (_, i) => i + 1).filter(isAnswered).length;
  const doubtfulCount = Object.values(doubtfulMap).filter(Boolean).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center border border-blue-400/30">
              <FileText className="w-4 h-4 text-blue-200" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide">Daftar Nomor Soal CBT</h3>
              <p className="text-xs text-blue-200">
                Total {totalQuestions} Butir Soal • Bab 1 & Bab 2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-blue-900/50 hover:bg-rose-600/80 text-blue-100 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Legend */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {/* Active: Biru */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <span className="w-4 h-4 rounded-md bg-blue-600 ring-2 ring-blue-300 shrink-0"></span>
            <span className="text-slate-700 font-semibold truncate">Sedang Dikerjakan</span>
          </div>
          {/* Answered: Hijau */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <span className="w-4 h-4 rounded-md bg-emerald-600 shrink-0"></span>
            <span className="text-slate-700 font-semibold truncate">Sudah Dikerjakan ({answeredCount})</span>
          </div>
          {/* Doubtful: Oranye */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <span className="w-4 h-4 rounded-md bg-amber-500 shrink-0"></span>
            <span className="text-slate-700 font-semibold truncate">Ragu-Ragu ({doubtfulCount})</span>
          </div>
          {/* Unanswered: Abu-abu */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <span className="w-4 h-4 rounded-md bg-slate-200 border border-slate-300 shrink-0"></span>
            <span className="text-slate-700 font-semibold truncate">Belum Dijawab ({unansweredCount})</span>
          </div>
        </div>

        {/* Grid Numbers Area */}
        <div className="p-5 overflow-y-auto grow">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const qId = index + 1;
              const isActive = index === currentIndex;
              const answered = isAnswered(qId);
              const isDoubtful = !!doubtfulMap[qId];

              // Color classes matching prompt specs:
              // Sedang dikerjakan: warna biru
              // Sudah dikerjakan: warna hijau
              // Ragu-ragu: warna oranye
              // Belum dijawab: warna netral/abu
              let btnClass = 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200';

              if (isActive) {
                // Sedang dikerjakan: BIRU
                btnClass = 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400 font-black shadow-md';
              } else if (isDoubtful) {
                // Ragu-ragu: ORANYE
                btnClass = 'bg-amber-500 text-white border-amber-600 shadow-xs font-bold';
              } else if (answered) {
                // Sudah dikerjakan: HIJAU
                btnClass = 'bg-emerald-600 text-white border-emerald-700 shadow-xs font-bold';
              }

              return (
                <button
                  key={qId}
                  onClick={() => {
                    onSelectQuestion(index);
                    onClose();
                  }}
                  className={`h-11 rounded-xl border flex flex-col items-center justify-center relative transition-all duration-150 transform active:scale-95 cursor-pointer ${btnClass}`}
                >
                  <span className="text-sm">{qId}</span>
                  {/* Subtle marker for question types */}
                  <span className="text-[9px] opacity-80 leading-none">
                    {qId <= 20 ? 'PG' : qId <= 30 ? 'Komp' : 'Jodoh'}
                  </span>
                  {isDoubtful && !isActive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium">
            Progres: <strong className="text-emerald-700 font-bold">{answeredCount}</strong> dari {totalQuestions} soal terisi
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Tutup Daftar
            </button>
            <button
              onClick={() => {
                onClose();
                onSubmitExam();
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Kirim Ujian Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
