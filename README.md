# SAHABAT PEKA SD - Kabupaten Tabalong
### Sistem Administrasi Harian, Jurnal Pembelajaran, Presensi & Pelaporan Terpadu Pendidikan Karakter (PEKA) Jenjang Sekolah Dasar Kabupaten Tabalong

Aplikasi web modern berbasis **PWA (Progressive Web App)** yang dirancang khusus untuk mempermudah fasilitator Pendidikan Karakter (PEKA) di seluruh SD se-Kabupaten Tabalong dalam mengelola administrasi harian, mencatat jurnal kegiatan, merekap kehadiran, dan mencetak dokumen laporan bulanan resmi siap cetak format **Kertas F4 / Folio (215 mm x 330 mm)**.

---

## Fitur Utama

1. **Database Resmi 213 SD se-Kabupaten Tabalong:**
   - 100% sinkron dengan data resmi Disdikbud Kabupaten Tabalong.
   - Pilihan sekolah dikelompokkan per kecamatan (12 Kecamatan di Kab. Tabalong).
   - NPSN resmi terisi otomatis saat nama sekolah dipilih.

2. **Dukungan Akses Offline 100% (PWA):**
   - Dilengkapi *Service Worker* dan *Web App Manifest*.
   - Dapat di-install langsung ke layar utama (*Add to Home Screen*) di Android & iPhone layaknya aplikasi asli (*Native App*).
   - Seluruh data tersimpan otomatis di perangkat HP/laptop pengguna (`localStorage`) dan dapat dibuka tanpa koneksi internet sama sekali.

3. **Format Pelaporan Sesuai Standar Dinas (Kertas F4 / Folio):**
   - **Cover Laporan:** Judul, periode bulan, nama fasilitator, sekolah, dan kecamatan.
   - **Bagian A & B:** Profil Satuan Pendidikan & Identitas Fasilitator.
   - **Bagian C:** Data Murid Keseluruhan & Peserta PEKA per Kelas I s.d. VI serta Kelompok Belajar (Iqra & Al-Qur'an untuk Islam).
   - **Bagian D:** Rekap Presensi Fasilitator & Presensi Peserta (Persentase Kehadiran Terkalkulasi Otomatis).
   - **Bagian E:** Rekap Pelaksanaan Kegiatan (Jadwal, hari apa saja, berapa hari pertemuan, frekuensi pertemuan per kelas dan kelompok Iqra/Al-Quran, serta tabel rincian keterlaksanaan jurnal).
   - **Blok Pengesahan Resmi:** Tanda tangan Kepala Sekolah / Plt. Kepala Sekolah (tanpa nama sekolah) & Fasilitator PEKA.
   - **Sistem Paginasi Cerdas:** Jika jurnal banyak (>14 pertemuan), halaman menyambung otomatis ke lembar berikutnya tanpa terpotong.
   - **Daftar Hadir Fasilitator (Landscape):** Lembar absensi tanggal 1–31 untuk paraf kehadiran.
   - **Dokumentasi Foto Kegiatan:** Hingga 3 foto dokumentasi per bulan.

4. **Cadangkan & Pulihkan Data (Backup & Restore):**
   - Fasilitator dapat mengunduh seluruh data dalam format `.json` untuk disimpan di Google Drive / WhatsApp dan memulihkannya kapan saja ke perangkat lain.

---

## Panduan Deploy

### 1. Deploy ke GitHub Pages
1. Buat repositori baru di GitHub (misal: `sahabat-peka-sd`).
2. Unggah seluruh berkas di folder ini ke repositori tersebut:
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi aplikasi SAHABAT PEKA SD Tabalong"
   git branch -M main
   git remote add origin https://github.com/USERNAME/sahabat-peka-sd.git
   git push -u origin main
   ```
3. Buka repositori di GitHub $\rightarrow$ **Settings** $\rightarrow$ **Pages**.
4. Pada bagian **Build and deployment**:
   - Source: pilih **Deploy from a branch**.
   - Branch: pilih `main` / `root` $\rightarrow$ klik **Save**.
5. Tunggu sekitar 1 menit, aplikasi Anda akan tayang di:
   `https://USERNAME.github.io/sahabat-peka-sd/`

### 2. Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **Add New...** $\rightarrow$ **Project**.
3. Pilih repositori `sahabat-peka-sd` $\rightarrow$ klik **Import**.
4. Biarkan konfigurasi bawaan (Framework Preset: *Other*, Root Directory: `./`).
5. Klik **Deploy**.
6. Dalam hitungan detik, aplikasi Anda aktif di `https://nama-proyek.vercel.app`.

---

## Cara Menggunakan Secara Offline di HP

1. Buka tautan website aplikasi di browser HP Anda saat ada koneksi internet (Google Chrome di Android, atau Safari di iPhone).
2. **Di Android (Google Chrome):**
   - Ketuk menu titik tiga `⋮` di kanan atas.
   - Pilih **Tambahkan ke Layar Utama** (*Add to Home Screen*) atau **Instal Aplikasi**.
3. **Di iPhone (Safari):**
   - Ketuk ikon **Bagikan** (*Share* tanda panah ke atas) di menu bawah.
   - Gulir ke bawah dan pilih **Tambah ke Layar Utama** (*Add to Home Screen*).
4. Ikon aplikasi **Sahabat PEKA** akan muncul di beranda HP Anda.
5. Anda kini dapat membuka, mengisi jurnal, melihat rekap, dan mencetak laporan kapan saja meskipun **koneksi internet dimatikan (Offline)**.

