import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { QuestionPaletteModal } from './components/QuestionPaletteModal';
import { QuestionCard } from './components/QuestionCard';
import { QuestionBoxPanel } from './components/QuestionBoxPanel';
import { ResultScreen } from './components/ResultScreen';
import { SecurityWarningModal } from './components/SecurityWarningModal';
import { TeacherRecapModal } from './components/TeacherRecapModal';
import {
  QUESTIONS_DATA,
  Question,
  SingleChoiceQuestion,
  ComplexChoiceQuestion,
  MatchingQuestion,
  shuffleSingleChoiceOptions
} from './data/questions';
import { StudentUser, StudentAnswer, ExamResult } from './types';
import { submitExamToSpreadsheet } from './services/spreadsheet';
import { saveStudentSubmission, CompletedStudentRecord } from './services/studentStorage';
import {
  Timer,
  ListOrdered,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Send,
  AlertTriangle,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

const QUESTION_TIME_LIMIT = 60; // 60 detik setiap soal sesuai ketentuan

export default function App() {
  // Questions State (shuffled options per student session)
  const [questions, setQuestions] = useState<Question[]>(() => shuffleSingleChoiceOptions(QUESTIONS_DATA));

  // Application State
  const [student, setStudent] = useState<StudentUser | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, StudentAnswer>>({});
  const [doubtfulMap, setDoubtfulMap] = useState<Record<number, boolean>>({});
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBoxPanelCollapsed, setIsBoxPanelCollapsed] = useState<boolean>(false);
  const [isTeacherPortalOpen, setIsTeacherPortalOpen] = useState<boolean>(false);

  // Security & Anti-Cheat State
  const [securityViolationCount, setSecurityViolationCount] = useState<number>(0);
  const [showSecurityWarning, setShowSecurityWarning] = useState<boolean>(false);
  const [securityReason, setSecurityReason] = useState<'tab_switch' | 'screenshot'>('tab_switch');
  const [isBlackoutActive, setIsBlackoutActive] = useState<boolean>(false);

  // Timer: 60 detik per soal
  const [secondsLeft, setSecondsLeft] = useState<number>(QUESTION_TIME_LIMIT);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer when question changes
  useEffect(() => {
    if (!student || examResult) return;
    setSecondsLeft(QUESTION_TIME_LIMIT);
  }, [currentQuestionIndex, student, examResult]);

  // Countdown Interval
  useEffect(() => {
    if (!student || examResult) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Timer reached 0 for current question - auto advance if not on last question
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((curr) => curr + 1);
            return QUESTION_TIME_LIMIT;
          } else {
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [student, examResult, currentQuestionIndex, questions.length]);

  // Audio beep for last 5 seconds
  useEffect(() => {
    if (soundEnabled && secondsLeft <= 5 && secondsLeft > 0 && student && !examResult) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch {
        // AudioContext might be restricted until user interacts
      }
    }
  }, [secondsLeft, soundEnabled, student, examResult]);

  // ========================================================
  // SECURITY SYSTEM: Anti-Copy, Anti-Screenshot, Anti-Tab Switch
  // ========================================================
  useEffect(() => {
    if (!student || examResult) return;

    // 1. Anti Tab Switch (Visibility & Blur Listener)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setSecurityViolationCount((prev) => {
          const next = prev + 1;
          setSecurityReason('tab_switch');
          setShowSecurityWarning(true);
          return next;
        });
      }
    };

    const handleWindowBlur = () => {
      setSecurityViolationCount((prev) => {
        const next = prev + 1;
        setSecurityReason('tab_switch');
        setShowSecurityWarning(true);
        return next;
      });
    };

    // 2. Anti Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 3. Anti Copy / Cut / Select
    const handleCopyCut = (e: ClipboardEvent) => {
      e.preventDefault();
      try {
        navigator.clipboard?.writeText('');
      } catch {}
      return false;
    };

    // 4. Anti Keyboard Shortcuts (PrintScreen, Ctrl+C, Ctrl+U, Ctrl+P, F12, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen detection
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        try {
          navigator.clipboard?.writeText('');
        } catch {}
        setIsBlackoutActive(true);
        setTimeout(() => setIsBlackoutActive(false), 2500);
        setSecurityViolationCount((prev) => prev + 1);
        setSecurityReason('screenshot');
        setShowSecurityWarning(true);
        return false;
      }

      // Block Ctrl+C, Cmd+C, Ctrl+A, Ctrl+U, Ctrl+P
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 'p' || e.key === 'P' || e.key === 'a' || e.key === 'A')
      ) {
        e.preventDefault();
        return false;
      }

      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopyCut);
    window.addEventListener('cut', handleCopyCut);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopyCut);
      window.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [student, examResult]);

  // Login handler: Acak opsi pilihan ganda khusus untuk sesi ujian siswa ini
  const handleLogin = (user: StudentUser) => {
    setQuestions(shuffleSingleChoiceOptions(QUESTIONS_DATA));
    setStudent(user);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setDoubtfulMap({});
    setExamResult(null);
    setSecondsLeft(QUESTION_TIME_LIMIT);
    setSecurityViolationCount(0);
    setShowSecurityWarning(false);
  };

  // Logout handler
  const handleLogout = () => {
    setStudent(null);
    setExamResult(null);
    setAnswers({});
    setDoubtfulMap({});
  };

  // View previous submission if student already took the exam
  const handleViewPrevious = (rec: CompletedStudentRecord) => {
    const prevResult: ExamResult = {
      student: {
        name: rec.name,
        studentClass: rec.studentClass,
        absentNumber: rec.absentNumber,
        loginTime: '-'
      },
      totalScore: rec.score,
      totalQuestions: QUESTIONS_DATA.length,
      correctCount: Math.round((rec.score / 100) * QUESTIONS_DATA.length),
      unansweredCount: 0,
      doubtfulCount: 0,
      submittedAt: rec.submittedAt,
      submissionStatus: 'success',
      submissionMessage: 'Data telah tersimpan di sistem.',
      questionScores: []
    };
    setStudent(prevResult.student);
    setExamResult(prevResult);
  };

  // Toggle Doubtful (Ragu-ragu)
  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentDoubtful = !!doubtfulMap[currentQuestion?.id];

  const handleToggleDoubtful = () => {
    if (!currentQuestion) return;
    setDoubtfulMap((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  // Answer change handler
  const handleAnswerChange = (newAns: StudentAnswer) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: newAns
    }));
  };

  // Navigation handlers
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Calculate final score based on the current randomized questions
  const calculateResults = (): ExamResult => {
    let totalScore = 0;
    let correctCount = 0;
    const questionScores = [];
    const pointsPerQuestion = 100 / questions.length; // 2.5 poin per butir soal

    for (const q of questions) {
      const studentAns = answers[q.id];
      let questionScore = 0;
      let isCorrect = false;

      if (q.type === 'single_c4_c5') {
        const singleQ = q as SingleChoiceQuestion;
        if (studentAns === singleQ.correctAnswer) {
          questionScore = pointsPerQuestion;
          isCorrect = true;
          correctCount++;
        }
      } else if (q.type === 'complex') {
        const complexQ = q as ComplexChoiceQuestion;
        const selectedIds = Array.isArray(studentAns) ? (studentAns as string[]) : [];
        const correctIds = complexQ.statements.filter((s) => s.isCorrect).map((s) => s.id);
        const incorrectIds = complexQ.statements.filter((s) => !s.isCorrect).map((s) => s.id);

        const matchedCorrect = selectedIds.filter((id) => correctIds.includes(id)).length;
        const selectedWrong = selectedIds.filter((id) => incorrectIds.includes(id)).length;

        if (selectedWrong === 0 && matchedCorrect === correctIds.length) {
          questionScore = pointsPerQuestion;
          isCorrect = true;
          correctCount++;
        } else if (selectedWrong === 0 && matchedCorrect > 0) {
          questionScore = (matchedCorrect / correctIds.length) * pointsPerQuestion;
        } else {
          questionScore = Math.max(0, ((matchedCorrect - selectedWrong * 0.5) / correctIds.length) * pointsPerQuestion);
        }
      } else if (q.type === 'matching') {
        const matchingQ = q as MatchingQuestion;
        const ansRecord =
          typeof studentAns === 'object' && studentAns !== null && !Array.isArray(studentAns)
            ? (studentAns as Record<string, string>)
            : {};

        let pairsCorrect = 0;
        for (const pair of matchingQ.pairs) {
          if (ansRecord[pair.id] === pair.correctRightId) {
            pairsCorrect++;
          }
        }

        const scoreRatio = pairsCorrect / matchingQ.pairs.length;
        questionScore = scoreRatio * pointsPerQuestion;
        if (pairsCorrect === matchingQ.pairs.length) {
          isCorrect = true;
          correctCount++;
        }
      }

      totalScore += questionScore;
      questionScores.push({
        questionId: q.id,
        score: questionScore,
        maxScore: pointsPerQuestion,
        isCorrect
      });
    }

    const roundedScore = Math.round(totalScore * 10) / 10;
    const answeredCount = Object.keys(answers).length;
    const doubtfulCount = Object.values(doubtfulMap).filter(Boolean).length;

    return {
      student: student!,
      totalScore: roundedScore,
      totalQuestions: questions.length,
      correctCount,
      unansweredCount: questions.length - answeredCount,
      doubtfulCount,
      submittedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      submissionStatus: 'sending',
      questionScores
    };
  };

  // Submit Exam to Google Spreadsheet & Lock 1 Submission Per Name
  const handleSubmitExam = async () => {
    setShowSubmitModal(false);
    const result = calculateResults();
    setExamResult(result);

    // Save submission locally to lock 1 name 1 submission
    saveStudentSubmission({
      name: result.student.name,
      studentClass: result.student.studentClass,
      absentNumber: result.student.absentNumber,
      score: result.totalScore,
      submittedAt: result.submittedAt
    });

    // Call Google Apps Script endpoint
    try {
      const res = await submitExamToSpreadsheet({
        nama: result.student.name,
        nomor: result.student.absentNumber,
        kelas: result.student.studentClass,
        nilai: result.totalScore,
        totalSoal: result.totalQuestions,
        benar: result.correctCount,
        waktuSubmit: result.submittedAt
      });

      setExamResult((prev) =>
        prev
          ? {
              ...prev,
              submissionStatus: res.success ? 'success' : 'error',
              submissionMessage: res.message
            }
          : null
      );
    } catch {
      setExamResult((prev) =>
        prev
          ? {
              ...prev,
              submissionStatus: 'error',
              submissionMessage: 'Gagal menghubungi server Google Apps Script.'
            }
          : null
      );
    }
  };

  // Quick answered checker
  const isQuestionAnswered = (qId: number) => {
    const a = answers[qId];
    if (a === undefined || a === null) return false;
    if (typeof a === 'string') return a.trim().length > 0;
    if (Array.isArray(a)) return a.length > 0;
    if (typeof a === 'object') return Object.keys(a).length > 0;
    return false;
  };

  const totalAnswered = Object.keys(answers).filter((id) => isQuestionAnswered(Number(id))).length;

  return (
    <div
      onContextMenu={(e) => {
        if (student && !examResult) e.preventDefault();
      }}
      className="min-h-screen bg-slate-100 font-sans flex flex-col text-slate-900 select-none antialiased relative"
    >
      
      {/* Blackout Protective Screen against Screenshot */}
      {isBlackoutActive && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white p-6 text-center animate-fadeIn">
          <ShieldAlert className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-rose-400 mb-2">
            TANGKAPAN LAYAR (SCREENSHOT) DILARANG!
          </h2>
          <p className="text-sm text-slate-300 max-w-md">
            Sistem CBT telah memblokir tangkapan layar demi kerahasiaan dan keamanan soal asesmen.
          </p>
        </div>
      )}

      {/* 1. Header Biru dengan Logo & Identitas Pengguna */}
      <Header
        student={student}
        onLogout={student && !examResult ? handleLogout : undefined}
        onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="grow">
        {!student ? (
          /* Halaman Login CBT dengan Validasi 1 Nama 1 Kali */
          <LoginScreen
            onLogin={handleLogin}
            onViewPreviousResult={handleViewPrevious}
            onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
          />
        ) : examResult ? (
          /* Halaman Rekapitulasi & Hasil Ujian */
          <ResultScreen
            result={examResult}
            onLogout={handleLogout}
          />
        ) : (
          /* Halaman Ujian Soal CBT dengan Kotak Nomor Soal Terlihat Langsung */
          <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-4 no-print-exam">
            
            {/* Integrity Warning Strip */}
            <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl flex items-center justify-between text-xs text-amber-900 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Sistem Keamanan Aktif:</strong> Dilarang beralih tab, menyalin teks, atau mengambil tangkapan layar.
                </span>
              </div>
              {securityViolationCount > 0 && (
                <span className="bg-rose-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                  {securityViolationCount} Peringatan
                </span>
              )}
            </div>

            {/* Top Control Bar: Red Box Timer & Tombol Daftar Soal */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
              
              {/* Left: Timer Hitung Mundur 60 Detik dalam Kotak Merah & Tombol Daftar Soal */}
              <div className="flex items-center gap-3">
                
                {/* Kotak Merah Timer 60 Detik */}
                <div
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border-2 font-mono font-bold shadow-xs transition-all ${
                    secondsLeft <= 10
                      ? 'bg-rose-600 border-rose-700 text-white animate-pulse ring-2 ring-rose-400'
                      : 'bg-rose-600 border-rose-700 text-white shadow-rose-200'
                  }`}
                  title="Waktu tersisa untuk soal ini (Hitung mundur 60 detik per soal)"
                >
                  <Timer className={`w-5 h-5 ${secondsLeft <= 10 ? 'animate-spin' : ''}`} />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-sans tracking-wider opacity-90 leading-tight">
                      Sisa Waktu Soal
                    </span>
                    <span className="text-base sm:text-lg font-black leading-none">
                      00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                    </span>
                  </div>
                </div>

                {/* Tombol Daftar Soal (Modal Pop-up) */}
                <button
                  onClick={() => setIsPaletteOpen(true)}
                  className="px-3.5 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-700 hover:bg-blue-600 text-white shadow-sm hover:shadow flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <ListOrdered className="w-4 h-4 text-blue-200" />
                  <span>Daftar Soal</span>
                  <span className="bg-blue-900/80 px-2 py-0.5 rounded-full text-[11px] font-mono text-amber-300">
                    {totalAnswered}/{questions.length}
                  </span>
                </button>
              </div>

              {/* Right Utility: Font Size, Sound Toggle, Fullscreen */}
              <div className="flex items-center gap-1.5 ml-auto">
                {/* Font Size Adjuster */}
                <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs">
                  <span className="text-slate-500 px-1 text-[11px] font-medium">Ukuran Teks:</span>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      fontSize === 'normal' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      fontSize === 'large' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      fontSize === 'xlarge' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    A++
                  </button>
                </div>

                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? 'Matikan Suara Beep' : 'Aktifkan Suara Beep'}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    soundEnabled
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  title="Layar Penuh"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* Kotak Nomor Soal Terbuka Langsung Pada Halaman Ujian */}
            <QuestionBoxPanel
              totalQuestions={questions.length}
              currentIndex={currentQuestionIndex}
              answers={answers}
              doubtfulMap={doubtfulMap}
              onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
              isCollapsed={isBoxPanelCollapsed}
              onToggleCollapse={() => setIsBoxPanelCollapsed(!isBoxPanelCollapsed)}
            />

            {/* Question Card in Center (Opsi jawaban diacak, anti-salin, anti-screenshot) */}
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                answer={answers[currentQuestion.id] || null}
                onAnswerChange={handleAnswerChange}
                fontSize={fontSize}
              />
            )}

            {/* Bottom Navigation Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
              
              {/* Tombol "Soal Sebelumnya" */}
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentQuestionIndex === 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 text-white shadow-sm active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Soal Sebelumnya</span>
              </button>

              {/* Tombol "Ragu-Ragu" Berwarna Oranye */}
              <button
                onClick={handleToggleDoubtful}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isCurrentDoubtful
                    ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-300'
                    : 'bg-amber-500 hover:bg-amber-400 text-white'
                }`}
                title="Tandai nomor ini jika Anda ragu-ragu dengan jawaban"
              >
                <Bookmark className={`w-4 h-4 ${isCurrentDoubtful ? 'fill-current' : ''}`} />
                <span>{isCurrentDoubtful ? 'Batal Ragu-Ragu' : 'Ragu-Ragu'}</span>
              </button>

              {/* Tombol "Soal Selanjutnya" / "Kirim Jawaban" */}
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-sm active:scale-95 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Soal Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-95 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Jawaban CBT</span>
                </button>
              )}

            </div>

          </div>
        )}
      </main>

      {/* Security Warning Modal when student switches tab or tries screenshot */}
      <SecurityWarningModal
        isOpen={showSecurityWarning}
        violationCount={securityViolationCount}
        reason={securityReason}
        onAcknowledge={() => setShowSecurityWarning(false)}
      />

      {/* Daftar Soal Modal / Drawer */}
      <QuestionPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        totalQuestions={questions.length}
        currentIndex={currentQuestionIndex}
        answers={answers}
        doubtfulMap={doubtfulMap}
        onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
        onSubmitExam={() => setShowSubmitModal(true)}
      />

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-slate-800">
                Selesaikan Ujian CBT?
              </h3>
              <p className="text-xs text-slate-600">
                Data jawaban Anda akan dihitung dan dikirim langsung ke <strong>Spreadsheet Nilai Guru</strong>. Anda tidak dapat mengulang ujian ini kembali.
              </p>
            </div>

            {/* Quick Summary Box */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Murid:</span>
                <span className="font-bold text-slate-800">{student?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kelas & Absen:</span>
                <span className="font-bold text-slate-800">{student?.studentClass} • No. {student?.absentNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Soal Terjawab:</span>
                <span className="font-bold text-emerald-600">{totalAnswered} dari {questions.length} butir</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Soal Ragu-ragu:</span>
                <span className="font-bold text-amber-600">
                  {Object.values(doubtfulMap).filter(Boolean).length} butir
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Belum Terjawab:</span>
                <span className="font-bold text-rose-600">
                  {questions.length - totalAnswered} butir
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cek Jawaban Lagi
              </button>
              <button
                onClick={handleSubmitExam}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all cursor-pointer"
              >
                Ya, Kirim Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Recap Modal for viewing cumulative students & configuring custom sheet url */}
      <TeacherRecapModal
        isOpen={isTeacherPortalOpen}
        onClose={() => setIsTeacherPortalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-4 text-center text-xs text-slate-500">
        <p>Aplikasi CBT Pendidikan Pancasila Kelas XI • Sesuai Buku Siswa Kemdikbudristek & BPIP (Halaman 4 - 63)</p>
      </footer>
    </div>
  );
}
