import React, { useState } from 'react';
import { StudentUser } from '../types';
import { CLASS_OPTIONS } from '../data/questions';
import { checkStudentHasSubmitted, CompletedStudentRecord } from '../services/studentStorage';
import { User, KeyRound, GraduationCap, CheckCircle2, AlertCircle, ShieldAlert, Sparkles, Award } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (student: StudentUser) => void;
  onViewPreviousResult?: (record: CompletedStudentRecord) => void;
  onOpenTeacherPortal?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onViewPreviousResult, onOpenTeacherPortal }) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState(CLASS_OPTIONS[0]);
  const [absentNumber, setAbsentNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadySubmittedRecord, setAlreadySubmittedRecord] = useState<CompletedStudentRecord | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    setErrorMessage('');
    // Proactively check if student already took the test
    if (val.trim().length >= 3) {
      const existing = checkStudentHasSubmitted(val.trim());
      setAlreadySubmittedRecord(existing);
    } else {
      setAlreadySubmittedRecord(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Silakan masukkan Nama Murid.');
      return;
    }
    if (!absentNumber.trim()) {
      setErrorMessage('Silakan masukkan Nomer Absen.');
      return;
    }

    // Strict 1 name 1 submission check
    const existing = checkStudentHasSubmitted(name.trim());
    if (existing) {
      setAlreadySubmittedRecord(existing);
      setErrorMessage(`Nama "${existing.name}" sudah pernah menyelesaikan ujian ini pada ${existing.submittedAt}. Sesuai ketentuan, setiap nama murid hanya dapat mengerjakan ujian sebanyak 1 kali.`);
      return;
    }

    setErrorMessage('');
    onLogin({
      name: name.trim(),
      studentClass,
      absentNumber: absentNumber.trim(),
      loginTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-100 via-blue-50/60 to-slate-200">
      <div className="w-full max-w-md">

        {/* School / Exam Badge */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-blue-200">
            <GraduationCap className="w-4 h-4 text-blue-700" />
            <span>Sistem CBT Ujian Sekolah Berbasis Komputer</span>
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Latihan Soal Asesmen Pendidikan Pancasila
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Materi Bab 1 & Bab 2 • Kurikulum Merdeka Jenjang SMK/SMA
          </p>
        </div>

        {/* White Center Login Box */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-5 text-white text-center relative">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Masukkan identitas peserta didik untuk memulai sesi ujian CBT
            </p>
            <div className="absolute top-3 right-3 text-white/20">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Warning if already submitted */}
            {alreadySubmittedRecord ? (
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl space-y-2 text-xs text-amber-900">
                <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Akses Ujian Dibatasi (1 Kali Pengerjaan)</span>
                </div>
                <p>
                  Siswa dengan nama <strong>"{alreadySubmittedRecord.name}"</strong> ({alreadySubmittedRecord.studentClass}, No. {alreadySubmittedRecord.absentNumber}) telah terdata menyelesaikan ujian pada <strong>{alreadySubmittedRecord.submittedAt}</strong> dengan perolehan nilai <strong>{alreadySubmittedRecord.score}</strong>.
                </p>
                <div className="pt-1">
                  <span className="block text-[11px] font-semibold text-rose-700">
                    ⛔ Setiap nama murid hanya dapat mengerjakan ujian 1 kali.
                  </span>
                </div>
                {onViewPreviousResult && (
                  <button
                    type="button"
                    onClick={() => onViewPreviousResult(alreadySubmittedRecord)}
                    className="mt-2 w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Lihat Bukti Nilai Sebelumnya</span>
                  </button>
                )}
              </div>
            ) : errorMessage ? (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            {/* Input Nama Murid */}
            <div>
              <label htmlFor="student-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Murid
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <input
                  id="student-name"
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Farhan"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium transition-all"
                />
              </div>
            </div>

            {/* Dropdown Kelas */}
            <div>
              <label htmlFor="student-class" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kelas
              </label>
              <div className="relative rounded-xl shadow-sm">
                <select
                  id="student-class"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold transition-all cursor-pointer"
                >
                  {CLASS_OPTIONS.map((cls) => (
                    <option key={cls} value={cls} className="py-1">
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Nomer Absen */}
            <div>
              <label htmlFor="absent-number" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nomer Absen
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-5 h-5 text-blue-600" />
                </div>
                <input
                  id="absent-number"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="Contoh: 18"
                  value={absentNumber}
                  onChange={(e) => setAbsentNumber(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium transition-all"
                />
              </div>
            </div>

            {/* Big Bright Blue Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!!alreadySubmittedRecord}
                className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-white text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-150 ${
                  alreadySubmittedRecord
                    ? 'bg-slate-400 cursor-not-allowed opacity-70'
                    : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                }`}
              >
                <span>Login</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Card Footer Information */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-xs text-slate-500">
            <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span>📋 Informasi Format Ujian:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600">
              <li>• <strong>40 Butir Soal</strong>: 20 PG Literasi C4-C5 (opsi acak), 10 PG Kompleks, 10 Menjodohkan</li>
              <li>• <strong>Timer 60 Detik</strong> per nomor ujian dalam kotak indikator merah</li>
              <li>• <strong>Ketentuan:</strong> 1 nama murid hanya berhak mengerjakan ujian 1 kali</li>
              <li>• Nilai otomatis terhubung ke Google Spreadsheet guru setelah selesai dikirim</li>
            </ul>
          </div>
        </div>

        {/* Integrity note & Teacher Portal Shortcut */}
        <div className="text-center mt-4 space-y-2">
          {onOpenTeacherPortal && (
            <button
              type="button"
              onClick={onOpenTeacherPortal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>📊 Buka Spreadsheet & Rekap Nilai Guru</span>
            </button>
          )}
          <p className="text-[11px] text-slate-500">
            © 2026 Kemendikbudristek & BPIP • Pelajar Pancasila Berintegritas dan Bernalar Kritis
          </p>
        </div>
      </div>
    </div>
  );
};
