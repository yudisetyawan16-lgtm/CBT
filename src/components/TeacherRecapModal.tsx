import React, { useState } from 'react';
import { getCompletedStudents } from '../services/studentStorage';
import { getTeacherSpreadsheetUrl, setTeacherSpreadsheetUrl, downloadClassRecapExcel } from '../services/spreadsheet';
import { SPREADSHEET_ENDPOINT } from '../data/questions';
import {
  FileSpreadsheet,
  ExternalLink,
  Download,
  Copy,
  Check,
  X,
  Edit2,
  Save,
  Users,
  Search
} from 'lucide-react';

interface TeacherRecapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherRecapModal: React.FC<TeacherRecapModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [sheetUrl, setSheetUrl] = useState(getTeacherSpreadsheetUrl());
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState(sheetUrl);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const records = getCompletedStudents();
  const filteredRecords = records.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.absentNumber.includes(searchTerm)
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sheetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUrl = () => {
    const trimmed = inputUrl.trim();
    if (trimmed) {
      setTeacherSpreadsheetUrl(trimmed);
      setSheetUrl(trimmed);
    }
    setIsEditingUrl(false);
  };

  const handleDownloadExcel = () => {
    downloadClassRecapExcel(records);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide">
                Portal Rekap Nilai Guru & Spreadsheet CBT
              </h3>
              <p className="text-xs text-emerald-100">
                Pendidikan Pancasila Kelas XI • Akses Langsung Rekapitulasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-emerald-800/50 hover:bg-rose-600/80 text-emerald-100 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5 grow">
          
          {/* Main Action Links */}
          <div className="p-4 bg-emerald-50/80 border-2 border-emerald-300 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Tautan Akses Spreadsheet Guru
              </span>
              <button
                onClick={() => {
                  setInputUrl(sheetUrl);
                  setIsEditingUrl(!isEditingUrl);
                }}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingUrl ? 'Batal Edit' : 'Ubah URL Spreadsheet'}</span>
              </button>
            </div>

            {isEditingUrl ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Masukkan link Google Sheet atau Web App..."
                  className="w-full p-2.5 text-xs bg-white border border-emerald-400 rounded-lg text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setInputUrl(SPREADSHEET_ENDPOINT)}
                    className="text-[11px] text-slate-500 hover:text-slate-700"
                  >
                    Reset Default
                  </button>
                  <button
                    onClick={handleSaveUrl}
                    className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer hover:bg-emerald-700"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-2.5 bg-white border border-emerald-200 rounded-lg font-mono text-xs text-emerald-950 break-all select-all flex items-center justify-between gap-2">
                <span className="truncate">{sheetUrl}</span>
                <button
                  onClick={handleCopyLink}
                  className="shrink-0 p-1.5 rounded hover:bg-slate-100 text-slate-600 cursor-pointer"
                  title="Salin Tautan"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka Google Spreadsheet / Web App</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Tautan Rekap'}</span>
              </button>

              <button
                onClick={() => downloadClassRecapExcel(records)}
                disabled={records.length === 0}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                  records.length === 0
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm cursor-pointer'
                }`}
                title="Guru dapat mengunduh seluruh data nama, kelas, absen, dan nilai siswa yang telah masuk ke dalam format Excel dengan sekali klik"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Rekap Excel ({records.length})</span>
              </button>
            </div>
          </div>

          {/* Student Submissions List */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-600" />
                <h4 className="font-bold text-sm text-slate-800">
                  Daftar Pekerjaan Siswa Terekam ({records.length} Siswa)
                </h4>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari siswa / kelas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-48"
                />
              </div>
            </div>

            {filteredRecords.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl text-slate-500 text-xs">
                Belum ada data pengerjaan siswa yang tersimpan.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Nama Siswa</th>
                      <th className="py-2.5 px-3">Kelas</th>
                      <th className="py-2.5 px-3 text-center">Absen</th>
                      <th className="py-2.5 px-3 text-center">Nilai</th>
                      <th className="py-2.5 px-3">Waktu Kirim</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 font-medium">
                        <td className="py-2.5 px-3 font-mono text-slate-400 text-center">{i + 1}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-800">{r.name}</td>
                        <td className="py-2.5 px-3 font-mono text-blue-700">{r.studentClass}</td>
                        <td className="py-2.5 px-3 font-mono text-center text-slate-600">{r.absentNumber}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="inline-block px-2 py-0.5 rounded font-black text-xs bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {r.score}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">{r.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Semua data terhubung langsung ke Google Spreadsheet guru.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
