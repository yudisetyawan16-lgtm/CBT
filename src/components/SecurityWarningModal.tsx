import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SecurityWarningModalProps {
  isOpen: boolean;
  violationCount: number;
  onAcknowledge: () => void;
  reason?: 'tab_switch' | 'screenshot';
}

export const SecurityWarningModal: React.FC<SecurityWarningModalProps> = ({
  isOpen,
  violationCount,
  onAcknowledge,
  reason = 'tab_switch',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white max-w-md w-full rounded-2xl shadow-2xl border-2 border-rose-500 overflow-hidden transform animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-rose-600 px-6 py-4 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight">
              PERINGATAN INTEGRITAS UJIAN
            </h3>
            <p className="text-xs text-rose-100 font-medium">
              Pelanggaran Terdeteksi: Ke-{violationCount}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-2">
            <div className="font-bold text-sm text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                {reason === 'tab_switch'
                  ? 'Terdeteksi Beralih Tab / Meninggalkan Jendela Ujian'
                  : 'Terdeteksi Upaya Tangkapan Layar (Screenshot)'}
              </span>
            </div>
            <p className="leading-relaxed">
              {reason === 'tab_switch'
                ? 'Sistem CBT mendeteksi bahwa Anda telah berpindah tab, meminimalkan jendela browser, atau membuka aplikasi lain saat ujian sedang berlangsung. Aktivitas ini dicatat dalam sistem pengawas.'
                : 'Sistem pengawas CBT melarang keras pengambilan tangkapan layar (screenshot) atau penyalinan isi soal demi integritas asesmen.'}
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-slate-900">Peraturan Ketertiban CBT:</div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>Dilarang berpindah tab browser selama ujian.</li>
              <li>Dilarang menyalin (copy) naskah soal.</li>
              <li>Dilarang mengambil tangkapan layar (screenshot).</li>
              <li>Fokus pada lembar pengerjaan hingga menekan tombol Kirim.</li>
            </ul>
          </div>

          <button
            onClick={onAcknowledge}
            className="w-full py-3 px-4 rounded-xl font-extrabold text-sm text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Saya Mengerti & Kembali Mengerjakan Ujian</span>
          </button>
        </div>
      </div>
    </div>
  );
};
