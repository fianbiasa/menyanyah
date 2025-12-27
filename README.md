# Menyanyah Podcast Website

Website podcast dengan auto-update dari YouTube channel [@menyanyahpodcast](https://www.youtube.com/@menyanyahpodcast).

## 🚀 Fitur

- ✅ **Auto-update**: Otomatis fetch episodes terbaru dari YouTube
- 📺 **YouTube Integration**: Display semua video dari channel
- 🎨 **Responsive Design**: Tampil sempurna di desktop & mobile
- ⚡ **Fast Loading**: Optimized dengan lazy loading
- 📊 **Channel Stats**: Subscribers, views, dan video count real-time
- 🎬 **Video Modal**: Play video langsung di website
- 🔒 **Secure API Key**: API key tersembunyi di backend PHP (tidak terekspos ke pengunjung)

## 📋 Setup Instructions

### 1. Dapatkan YouTube API Key

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih yang sudah ada
3. Aktifkan **YouTube Data API v3**:
   - Navigation menu > APIs & Services > Library
   - Cari "YouTube Data API v3"
   - Klik "Enable"
4. Buat Credentials:
   - APIs & Services > Credentials
   - Create Credentials > API Key
   - Copy API Key yang dibuat

### 2. Konfigurasi API Key

1. Buka file `api.php`
2. Di baris 8, ganti dengan API Key kamu:
```php
const YOUTUBE_API_KEY = 'AIzaSy...'; // API Key kamu
```

### 3. Persyaratan Server

Website ini membutuhkan:
- ✅ **PHP 7.4+** (dengan curl extension)
- ✅ **Web server** (Apache/Nginx) yang support PHP

### 4. (Opsional) Amankan API Key Lebih Lanjut

Untuk keamanan ekstra, batasi API Key di Google Cloud Console:
- **HTTP referrers**: `menyanyah.xyz/*`
- **API restrictions**: Pilih "YouTube Data API v3" only

### 5. Deploy Website

Upload semua file ke web hosting kamu:
```
/var/www/html/menyanyah.xyz/
├── index.php          # Main file (PHP)
├── api.php            # Backend API proxy (menyimpan API key)
├── style.css          # Styling
├── script.js          # Frontend JavaScript
└── README.md          # Documentation
```

**Catatan**: File `config.js` sudah tidak digunakan lagi untuk keamanan.

## 🎯 Cara Kerja

1. **Frontend** (`index.php` + `script.js`) request data ke `api.php`
2. **Backend** (`api.php`) menyimpan API key dan forward request ke YouTube API
3. Data dari YouTube diteruskan ke frontend untuk ditampilkan
4. **API Key tersembunyi** di server, pengunjung tidak bisa melihatnya
5. Tidak perlu manual update - otomatis sync dengan YouTube channel!

## 🔧 Kustomisasi

### Ubah Jumlah Video per Load
Edit di `script.js`:
```javascript
const MAX_RESULTS = 12; // Ubah angka ini
```

### Ganti Channel
Edit di `script.js`:
```javascript
const CHANNEL_USERNAME = 'menyanyahpodcast'; // Ganti dengan channel lain
```

## 📱 Social Media

- **YouTube**: [@menyanyahpodcast](https://www.youtube.com/@menyanyahpodcast)
- **TikTok**: [@menyanyah.xyz](https://www.tiktok.com/@menyanyah.xyz)

## ⚠️ Troubleshooting

### Videos tidak muncul / Error 500
- Pastikan **PHP sudah terinstall** di server
- Pastikan **curl extension** aktif: `php -m | grep curl`
- Cek API Key di file `api.php` sudah benar
- Cek error log PHP: `/var/log/apache2/error.log` atau `/var/log/nginx/error.log`

### Error: "Channel tidak ditemukan"
- Cek nama channel di `CHANNEL_USERNAME` sudah benar
- Pastikan channel public/visible

### Videos tidak muncul / Error 403
- Cek quota API di Google Cloud Console
- Pastikan YouTube Data API v3 sudah enabled
- Cek console browser untuk error details (F12)

### API Key terekspos?
- **Aman!** API Key tersimpan di `api.php` yang diproses di server
- Pengunjung hanya bisa akses melalui proxy, tidak bisa lihat API Key asli

## 📊 API Quota

YouTube API memiliki quota limit gratis:
- **10,000 units per day** (gratis)
- Search request: ~100 units
- Video details: ~1 unit

Website ini menggunakan ~200 units per page load. Cukup untuk ~50 visitors per hari.

## 🛠️ Tech Stack

- **Backend**: PHP 7.4+ (API Proxy)
- **Frontend**: HTML5 + Vanilla JavaScript
- **Styling**: CSS3 (Custom)
- **API**: YouTube Data API v3
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## 📄 License

© 2025 Menyanyah Podcast. All rights reserved.
