import React, { useState } from 'react';
import { ExamResult } from '../types';
import {
  submitExamToSpreadsheet,
  getTeacherSpreadsheetUrl,
  downloadClassRecapExcel
} from '../services/spreadsheet';
import { getCompletedStudents } from '../services/studentStorage';
import { TeacherRecapModal } from './TeacherRecapModal';
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Printer,
  FileSpreadsheet,
  Award,
  BookOpen,
  LogOut,
  ShieldAlert,
  ExternalLink,
  Copy,
  Check,
  Download,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResultScreenProps {
  result: ExamResult;
  onLogout: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onLogout }) => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    result.submissionStatus
  );
  const [submissionMsg, setSubmissionMsg] = useState(result.submissionMessage || '');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  const teacherSheetUrl = getTeacherSpreadsheetUrl();

  // Trigger confetti on render if score >= 75
  React.useEffect(() => {
    if (result.totalScore >= 75) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignored
      }
    }
  }, [result.totalScore]);

  const handleResubmit = async () => {
    setSubmissionStatus('sending');
    const res = await submitExamToSpreadsheet({
      nama: result.student.name,
      nomor: result.student.absentNumber,
      kelas: result.student.studentClass,
      nilai: result.totalScore,
      totalSoal: result.totalQuestions,
      benar: result.correctCount,
      waktuSubmit: result.submittedAt
    });

    if (res.success) {
      setSubmissionStatus('success');
      setSubmissionMsg(res.message);
    } else {
      setSubmissionStatus('error');
      setSubmissionMsg(res.message);
    }
  };

  const handleCopySheetLink = () => {
    navigator.clipboard.writeText(teacherSheetUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadClassExcel = () => {
    const list = getCompletedStudents();
    downloadClassRecapExcel(list);
  };

  const handlePrint = () => {
    window.print();
  };

  // Grade classification
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { label: 'Sangat Baik (A)', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (score >= 80) return { label: 'Baik (B)', color: 'text-blue-700 bg-blue-100 border-blue-300' };
    if (score >= 70) return { label: 'Cukup (C - KKM Tercapai)', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    return { label: 'Perlu Remedial (D)', color: 'text-rose-700 bg-rose-100 border-rose-300' };
  };

  const gradeInfo = getGradeInfo(result.totalScore);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Printable Result Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-none">
        
        {/* Banner Top */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-blue-950 mb-2">
                <Award className="w-3.5 h-3.5" />
                HASIL LATIHAN SOAL ASESMEN CBT PENDIDIKAN PANCASILA XI
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">
                Rekapitulasi Nilai Akhir Siswa
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Materi Bab 1 & Bab 2 Kurikulum Merdeka • Kelas XI SMK/SMA
              </p>
            </div>

            {/* Big Score Dial */}
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 min-w-[150px]">
              <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">
                NILAI AKHIR
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight my-1">
                {result.totalScore.toFixed(0)}
              </div>
              <span className="text-[11px] text-blue-100">
                Skala 0 - 100
              </span>
            </div>
          </div>
        </div>

        {/* Notice 1 Kali Pengerjaan */}
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Informasi Sistem:</strong> Anda telah menyelesaikan sesi ujian. Sesuai kebijakan pengawas, setiap nama siswa hanya berhak mengerjakan ujian sebanyak 1 kali.
          </span>
        </div>

        {/* Student Identity Grid */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Identitas Peserta Didik
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">Nama Murid</div>
              <div className="text-base font-bold text-slate-800 truncate mt-0.5">
                {result.student.name}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">Kelas</div>
              <div className="text-base font-bold text-blue-700 mt-0.5 font-mono">
                {result.student.studentClass}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">Nomer Absen</div>
              <div className="text-base font-bold text-slate-800 mt-0.5 font-mono">
                {result.student.absentNumber}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">Waktu Selesai</div>
              <div className="text-sm font-semibold text-slate-700 mt-1 font-mono">
                {result.submittedAt}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Jawaban Benar</div>
                <div className="text-lg font-black text-slate-800">{result.correctCount} / {result.totalQuestions}</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Salah / Kurang</div>
                <div className="text-lg font-black text-slate-800">{result.totalQuestions - result.correctCount}</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Persentase</div>
                <div className="text-lg font-black text-slate-800">{((result.correctCount / result.totalQuestions) * 100).toFixed(0)}%</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
              <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${gradeInfo.color} w-full text-center`}>
                {gradeInfo.label}
              </div>
            </div>
          </div>
        </div>

        {/* Tautan & Integrasi Hasil Pekerjaan Siswa ke Spreadsheet Guru */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Hasil Pekerjaan Siswa Terhubung ke Spreadsheet Guru
                  </h3>
                  {submissionStatus === 'success' && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      TERKIRIM
                    </span>
                  )}
                  {submissionStatus === 'sending' && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                      MENGIRIM...
                    </span>
                  )}
                  {submissionStatus === 'error' && (
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      GAGAL
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Data yang dikirim: <strong>{result.student.name}</strong> • Kelas <strong>{result.student.studentClass}</strong> • Absen <strong>{result.student.absentNumber}</strong> • Nilai <strong>{result.totalScore}</strong>
                </p>
                {submissionMsg && (
                  <p className="text-xs font-semibold text-emerald-800 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{submissionMsg}</span>
                  </p>
                )}
              </div>
            </div>

            {submissionStatus !== 'success' && (
              <button
                onClick={handleResubmit}
                disabled={submissionStatus === 'sending'}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${submissionStatus === 'sending' ? 'animate-spin' : ''}`} />
                Kirim Ulang ke Spreadsheet
              </button>
            )}
          </div>

          {/* Teacher Access & Recap Toolbar */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-200/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Akses Rekapitulasi Nilai untuk Guru:
              </span>
              <span className="text-[11px] text-slate-500 font-mono truncate block max-w-sm sm:max-w-md">
                {teacherSheetUrl}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={teacherSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                title="Buka Spreadsheet Rekapitulasi Nilai Guru di Google"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Spreadsheet Guru</span>
              </a>

              <button
                onClick={handleCopySheetLink}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Salin Tautan Spreadsheet"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Tersalin!' : 'Salin Tautan'}</span>
              </button>

              <button
                onClick={handleDownloadClassExcel}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Guru dapat mengunduh seluruh data nama, kelas, absen, dan nilai siswa yang telah masuk ke dalam format Excel dengan sekali klik"
              >
                <Download className="w-3.5 h-3.5 text-teal-600" />
                <span>Unduh Rekap Excel</span>
              </button>

              <button
                onClick={() => setIsTeacherModalOpen(true)}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-teal-50 border border-teal-300 hover:bg-teal-100 text-teal-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Buka panel daftar semua siswa yang telah mengumpulkan"
              >
                <Users className="w-3.5 h-3.5 text-teal-700" />
                <span>Daftar Siswa Terkumpul</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="p-4 sm:p-6 bg-white flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak / Simpan Bukti Nilai (PDF)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Selesai & Keluar</span>
            </button>
          </div>
        </div>

      </div>

      {/* Teacher Recap Modal for viewing cumulative students & configuring custom sheet url */}
      <TeacherRecapModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />

    </div>
  );
};
