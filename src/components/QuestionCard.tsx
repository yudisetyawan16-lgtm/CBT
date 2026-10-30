import React from 'react';
import { Question, SingleChoiceQuestion, ComplexChoiceQuestion, MatchingQuestion } from '../data/questions';
import { StudentAnswer } from '../types';
import { BookOpen, CheckSquare, Layers, HelpCircle, Check, ArrowRightLeft } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  answer: StudentAnswer;
  onAnswerChange: (newAnswer: StudentAnswer) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  answer,
  onAnswerChange,
  fontSize,
}) => {
  // Font size classes
  const fontClasses = {
    normal: { text: 'text-sm sm:text-base', heading: 'text-base sm:text-lg', stimulus: 'text-xs sm:text-sm' },
    large: { text: 'text-base sm:text-lg', heading: 'text-lg sm:text-xl', stimulus: 'text-sm sm:text-base' },
    xlarge: { text: 'text-lg sm:text-xl', heading: 'text-xl sm:text-2xl', stimulus: 'text-base sm:text-lg' }
  }[fontSize];

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden select-none"
    >
      
      {/* Top Question Header Bar */}
      <div className="bg-slate-50 border-b border-slate-200/90 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white font-extrabold px-3 py-1 rounded-lg text-xs tracking-wider shadow-xs">
            SOAL NO. {currentIndex + 1}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            dari {totalQuestions} Soal
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Question Type Badge */}
          {question.type === 'single_c4_c5' && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold px-2.5 py-1 rounded-md">
              <Layers className="w-3 h-3 text-indigo-500" />
              Pilihan Ganda C4-C5 (5 Opsi)
            </span>
          )}
          {question.type === 'complex' && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-md">
              <CheckSquare className="w-3 h-3 text-emerald-600" />
              Pilihan Ganda Kompleks
            </span>
          )}
          {question.type === 'matching' && (
            <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
              <ArrowRightLeft className="w-3 h-3 text-amber-600" />
              Soal Menjodohkan
            </span>
          )}
          <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
            {question.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Stimulus Literasi Box */}
        {question.stimulus && (
          <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Stimulus / Teks Literasi: {question.title}</span>
            </div>
            <p className={`text-slate-700 leading-relaxed font-serif ${fontClasses.stimulus}`}>
              {question.stimulus}
            </p>
          </div>
        )}

        {/* Question Text */}
        <div className="space-y-1">
          <p className={`font-semibold text-slate-900 leading-snug ${fontClasses.heading}`}>
            {question.question}
          </p>
          {'instruction' in question && question.instruction && (
            <p className="text-xs text-blue-600 font-medium italic">
              * {question.instruction}
            </p>
          )}
        </div>

        {/* ==================================================== */}
        {/* OPTION RENDERER: TIPE 1 - PILIHAN GANDA (A, B, C, D, E) */}
        {/* ==================================================== */}
        {question.type === 'single_c4_c5' && (
          <div className="space-y-3 pt-2">
            {(question as SingleChoiceQuestion).options.map((opt) => {
              const isSelected = answer === opt.key;
              return (
                <label
                  key={opt.key}
                  onClick={() => onAnswerChange(opt.key)}
                  className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  {/* Lingkaran Radio Button */}
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-slate-400 group-hover:border-slate-500 bg-white'
                      }`}
                    >
                      {isSelected ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-500">
                          {opt.key}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Option Text */}
                  <div className="grow">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-bold ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>
                        Pilihan {opt.key}
                      </span>
                    </div>
                    <span className={`text-slate-800 leading-normal ${fontClasses.text} ${isSelected ? 'font-medium' : ''}`}>
                      {opt.text}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* ==================================================== */}
        {/* OPTION RENDERER: TIPE 2 - PILIHAN GANDA KOMPLEKS (Multi Checkbox) */}
        {/* ==================================================== */}
        {question.type === 'complex' && (
          <div className="space-y-3 pt-2">
            <div className="text-xs text-slate-500 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              💡 <em>Petunjuk: Anda dapat memilih lebih dari satu pernyataan yang menurut Anda benar.</em>
            </div>
            {(question as ComplexChoiceQuestion).statements.map((stmt) => {
              const currentSelections = Array.isArray(answer) ? answer : [];
              const isChecked = currentSelections.includes(stmt.id);

              const handleToggle = () => {
                let updated: string[];
                if (isChecked) {
                  updated = currentSelections.filter((id) => id !== stmt.id);
                } else {
                  updated = [...currentSelections, stmt.id];
                }
                onAnswerChange(updated);
              };

              return (
                <label
                  key={stmt.id}
                  onClick={handleToggle}
                  className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                    isChecked
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300 group-hover:border-slate-400 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                  <span className={`grow text-slate-800 leading-normal ${fontClasses.text} ${isChecked ? 'font-medium text-emerald-950' : ''}`}>
                    {stmt.text}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {/* ==================================================== */}
        {/* OPTION RENDERER: TIPE 3 - MENJODOHKAN (Interactive Matching) */}
        {/* ==================================================== */}
        {question.type === 'matching' && (
          <div className="space-y-4 pt-2">
            <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              💡 <em>Petunjuk: Pasangkan setiap item pada Kolom Kiri dengan pilihan jawaban yang paling tepat pada Kolom Kanan.</em>
            </div>

            <div className="space-y-3">
              {(question as MatchingQuestion).pairs.map((pair, pIdx) => {
                const currentRecord: Record<string, string> =
                  typeof answer === 'object' && !Array.isArray(answer) && answer !== null
                    ? (answer as Record<string, string>)
                    : {};
                const selectedOptionId = currentRecord[pair.id] || '';

                const handleSelectRight = (optId: string) => {
                  const updated = {
                    ...currentRecord,
                    [pair.id]: optId,
                  };
                  onAnswerChange(updated);
                };

                return (
                  <div
                    key={pair.id}
                    className="p-4 rounded-xl border-2 border-slate-200 bg-white shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      
                      {/* Left Item */}
                      <div className="md:col-span-5 flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {pIdx + 1}
                        </span>
                        <div className="font-semibold text-slate-800 text-sm sm:text-base">
                          {pair.leftText}
                        </div>
                      </div>

                      {/* Arrow Divider */}
                      <div className="hidden md:flex md:col-span-1 justify-center text-slate-400">
                        <ArrowRightLeft className="w-4 h-4 text-blue-500" />
                      </div>

                      {/* Right Dropdown Selection */}
                      <div className="md:col-span-6">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 md:hidden">
                          Pilih Pasangan Jawaban:
                        </label>
                        <select
                          value={selectedOptionId}
                          onChange={(e) => handleSelectRight(e.target.value)}
                          className={`w-full p-2.5 text-xs sm:text-sm rounded-lg border-2 transition-all cursor-pointer font-medium ${
                            selectedOptionId
                              ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold'
                              : 'border-slate-300 bg-slate-50 text-slate-600 focus:bg-white'
                          }`}
                        >
                          <option value="">-- Pilih Pasangan Jawaban --</option>
                          {(question as MatchingQuestion).rightOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
