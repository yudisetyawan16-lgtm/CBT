import React from 'react';
import { StudentAnswer } from '../types';
import { CheckCircle2, Bookmark, HelpCircle, Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionBoxPanelProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, StudentAnswer>;
  doubtfulMap: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const QuestionBoxPanel: React.FC<QuestionBoxPanelProps> = ({
  totalQuestions,
  currentIndex,
  answers,
  doubtfulMap,
  onSelectQuestion,
  isCollapsed = false,
  onToggleCollapse
}) => {
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Panel Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h3 className="font-bold text-xs sm:text-sm tracking-wide">
            Kotak Nomor Soal (1 - {totalQuestions})
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-mono text-slate-300">
            <span className="text-emerald-400 font-bold">{answeredCount}</span>/{totalQuestions}
          </div>
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isCollapsed ? 'Tampilkan Kotak Soal' : 'Sembunyikan Kotak Soal'}
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Quick Indicator Legend */}
          <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
            {/* Active (Sedang Dikerjakan) = BIRU */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">
              <span className="w-3.5 h-3.5 rounded bg-blue-600 ring-2 ring-blue-300 shrink-0"></span>
              <span className="text-slate-700 font-medium truncate">Aktif</span>
            </div>
            
            {/* Answered (Sudah Dikerjakan) = HIJAU */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">
              <span className="w-3.5 h-3.5 rounded bg-emerald-600 shrink-0"></span>
              <span className="text-slate-700 font-medium truncate">Sudah ({answeredCount})</span>
            </div>

            {/* Doubtful (Ragu-ragu) = ORANYE */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">
              <span className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0"></span>
              <span className="text-slate-700 font-medium truncate">Ragu ({doubtfulCount})</span>
            </div>

            {/* Unanswered (Belum Dikerjakan) = ABU-ABU */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300 shrink-0"></span>
              <span className="text-slate-700 font-medium truncate">Belum ({unansweredCount})</span>
            </div>
          </div>

          {/* Numbers Grid */}
          <div className="p-3 sm:p-4 max-h-[380px] overflow-y-auto">
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {Array.from({ length: totalQuestions }, (_, index) => {
                const qId = index + 1;
                const isActive = index === currentIndex;
                const answered = isAnswered(qId);
                const isDoubtful = !!doubtfulMap[qId];

                let boxClass = 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:border-slate-400';

                if (isActive) {
                  // Sedang dikerjakan: BIRU
                  boxClass = 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400 font-black shadow-md scale-105';
                } else if (isDoubtful) {
                  // Ragu-ragu: ORANYE
                  boxClass = 'bg-amber-500 text-white border-amber-600 shadow-xs font-bold';
                } else if (answered) {
                  // Sudah dikerjakan: HIJAU
                  boxClass = 'bg-emerald-600 text-white border-emerald-700 shadow-xs font-bold';
                }

                return (
                  <button
                    key={qId}
                    type="button"
                    onClick={() => onSelectQuestion(index)}
                    className={`h-9 sm:h-10 rounded-lg border flex items-center justify-center font-mono text-xs sm:text-sm font-semibold transition-all transform active:scale-95 cursor-pointer relative ${boxClass}`}
                    title={`Soal Nomor ${qId} - ${
                      isActive
                        ? 'Sedang dikerjakan'
                        : isDoubtful
                        ? 'Ragu-ragu'
                        : answered
                        ? 'Sudah dikerjakan'
                        : 'Belum dikerjakan'
                    }`}
                  >
                    <span>{qId}</span>
                    {isDoubtful && !isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full border border-white"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

    </div>
  );
};
