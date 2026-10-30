# 📚 CBT Pendidikan Pancasila Kelas XI (SMA/SMK)

Aplikasi Asesmen dan Latihan Soal Berbasis Komputer (**Computer Based Test / CBT**) untuk mata pelajaran **Pendidikan Pancasila Kelas XI (Kurikulum Merdeka)**, disusun secara komprehensif berdasarkan materi Buku Teks Kemendikbudristek & BPIP (Bab 1 dan Bab 2, Halaman 4–63).

Aplikasi ini bersifat **Open Source (Lisensi MIT)** dan dirancang agar dapat diakses serta digunakan secara bebas oleh guru, siswa, dan sekolah di seluruh Indonesia.

---

## 🔓 Panduan Mengubah Repositori Menjadi PUBLIC di GitHub

Agar repositori ini dapat diakses, dilihat, dan di-clone secara bebas oleh siapa saja di internet tanpa perlu izin atau login akun:

1. Buka halaman repositori Anda di situs **[GitHub](https://github.com)**.
2. Klik tab **⚙️ Settings** (di bagian kanan atas menu repositori).
3. Gulir ke bagian paling bawah halaman hingga menemukan kotak merah **"Danger Zone"**.
4. Pada baris **"Change repository visibility"**, klik tombol **"Change visibility"**.
5. Pilih opsi **"Make public"**.
6. Ketikkan nama repositori Anda sesuai instruksi di layar sebagai konfirmasi.
7. Klik tombol konfirmasi **"I understand, make this repository public"**.
8. ✅ Repositori Anda sekarang berstatus **Public** dan dapat diakses bebas oleh siapa saja melalui tautan GitHub Anda!

---

## ✨ Fitur Utama Aplikasi

- **40 Butir Soal Terstandar Asesmen**:
  - 20 Butir Soal Pilihan Ganda Literasi level C4–C5 (Opsi A–E diacak otomatis setiap sesi).
  - 10 Butir Soal Pilihan Ganda Kompleks (Multi-centang).
  - 10 Butir Soal Menjodohkan (Matching Pairs).
- **Timer Hitung Mundur 60 Detik** per butir soal dalam kotak indikator merah.
- **Sistem Integritas & Anti-Curang**:
  - Anti salin teks (*disable copy/paste/cut/context menu*).
  - Anti tangkapan layar (*anti-screenshot & blackout detector*).
  - Anti alih tab (*tab-switching detection & warning popup*).
- **Pembatasan 1 Siswa 1 Kali Pengerjaan**: Memastikan setiap nama murid hanya mengerjakan satu kali.
- **Integrasi Langsung ke Google Spreadsheet Guru**:
  - Pengiriman otomatis data nama, nomor absen, kelas, dan nilai siswa ke Google Apps Script:
    `https://script.google.com/macros/s/AKfycby48WE1aBPKMSt8osR-kJAhMOY_S58fvfHKeEgqdj5Re36I4D2Vsle00RQDDMUBa5O2/exec`
  - Tombol **"Buka Spreadsheet Guru"** untuk memantau rekap data masuk.
  - Tombol **"Unduh Rekap Excel"** untuk mengekspor seluruh nilai siswa ke file `.xls` rapi dengan sekali klik.

---

## 🚀 Cara Menjalankan Aplikasi Secara Mandiri (Local)

### 1. Clone Repositori
```bash
git clone https://github.com/<username>/<nama-repo>.git
cd <nama-repo>
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser di alamat `http://localhost:3000`.

### 4. Build untuk Produksi
```bash
npm run build
npm run preview
```

---

## ⚙️ Konfigurasi URL Google Spreadsheet Guru

Jika Anda ingin menghubungkan aplikasi ini ke Google Spreadsheet Anda sendiri:
1. Buat Google Sheet baru di Google Drive Anda.
2. Masuk ke menu **Ekstensi > Apps Script**.
3. Pasang kode penerima parameter (`Nama`, `Kelas`, `Nomor`, `Nilai`) pada fungsi `doPost(e)` atau `doGet(e)`.
4. Deploy sebagai **Web App** dengan akses: *"Anyone (Siapa saja)"*.
5. Salin URL Web App yang berakhiran `/exec` ke dalam file `src/data/questions.ts` pada variabel `SPREADSHEET_ENDPOINT` atau ubah langsung melalui tombol **"Ubah URL Spreadsheet"** di menu **📊 Rekap Spreadsheet Guru** pada aplikasi.

---

## 📄 Lisensi

Proyek ini berlisensi [MIT License](LICENSE) — Bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan pendidikan dan pembelajaran non-komersial maupun pengembangan sekolah.
