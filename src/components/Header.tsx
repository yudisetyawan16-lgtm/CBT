import React from 'react';
import { StudentUser } from '../types';
import { BookOpen, User } from 'lucide-react';

interface HeaderProps {
  student?: StudentUser | null;
  onLogout?: () => void;
  showLogoutConfirm?: boolean;
  onOpenTeacherPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ student, onLogout, onOpenTeacherPortal }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-md border-b-2 border-blue-500/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg flex items-center justify-center transform transition-transform hover:scale-105">
            <div className="w-full h-full bg-blue-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <BookOpen className="w-6 h-6 text-amber-300" />
              <div className="absolute inset-0 bg-blue-400/10 pointer-events-none"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-wide text-white drop-shadow-sm font-sans">
                Pendidikan Pancasila XI
              </span>
            </div>
            <p className="text-xs text-blue-200 hidden sm:block">
              Latihan Soal Ujian Asesmen Pendidikan Pancasila Kelas XI
            </p>
          </div>
        </div>

        {/* Right Area: Student Profile or Status */}
        {student ? (
          <div className="flex items-center gap-3">
            <div className="bg-blue-950/70 backdrop-blur-sm border border-blue-400/30 rounded-xl px-3.5 py-1.5 flex items-center gap-3 shadow-inner">
              <div className="w-9 h-9 rounded-lg bg-blue-600/80 border border-blue-400/50 flex items-center justify-center text-white font-bold shadow-sm">
                <User className="w-5 h-5 text-blue-100" />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white tracking-wide leading-tight max-w-[130px] sm:max-w-[200px] truncate">
                  {student.name}
                </div>
                <div className="text-xs text-blue-200 flex items-center justify-end gap-1.5 font-mono">
                  <span className="bg-blue-800/80 px-1.5 py-0.2 rounded text-[11px] font-semibold text-amber-300">
                    {student.studentClass}
                  </span>
                  <span>•</span>
                  <span>No. {student.absentNumber}</span>
                </div>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Keluar / Ganti Akun"
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-blue-800/50 hover:bg-rose-600/80 text-blue-200 hover:text-white transition-colors border border-blue-400/20 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {onOpenTeacherPortal && (
              <button
                onClick={onOpenTeacherPortal}
                className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg border border-emerald-400/40 shadow-xs transition-colors cursor-pointer"
                title="Buka Rekapitulasi Nilai & Spreadsheet Guru"
              >
                <span>📊 Rekap Spreadsheet Guru</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs text-blue-200 bg-blue-950/40 px-3 py-1.5 rounded-lg border border-blue-400/20">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Kurikulum Merdeka • Bab 1 & Bab 2</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
