# Menyanyah Podcast Website

Website podcast dengan auto-update dari YouTube channel [@menyanyahpodcast](https://www.youtube.com/@menyanyahpodcast).

## 🚀 Fitur

- ✅ **Auto-update**: Otomatis fetch episodes terbaru dari YouTube
- 📺 **YouTube Integration**: Display semua video dari channel
- 🎨 **Responsive Design**: Tampil sempurna di desktop & mobile
- ⚡ **Fast Loading**: Optimized dengan lazy loading
- 📊 **Channel Stats**: Subscribers, views, dan video count real-time
- 🎬 **Video Modal**: Play video langsung di website

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

1. Buka file `config.js`
2. Ganti `YOUR_YOUTUBE_API_KEY_HERE` dengan API Key kamu:
```javascript
const YOUTUBE_API_KEY = 'AIzaSy...'; // API Key kamu
```

### 3. (Opsional) Amankan API Key

Untuk production, batasi API Key di Google Cloud Console:
- **HTTP referrers**: `menyanyah.xyz/*`
- **API restrictions**: Pilih "YouTube Data API v3" only

### 4. Deploy Website

Upload semua file ke web hosting kamu:
```
/var/www/html/menyanyah.xyz/
├── index.html
├── style.css
├── script.js
├── config.js
└── README.md
```

## 🎯 Cara Kerja

1. Website akan otomatis fetch video dari YouTube API setiap kali halaman dibuka
2. Data ditampilkan dengan thumbnail, title, views, duration, dll
3. Click pada episode untuk play video
4. Tidak perlu manual update - otomatis sync dengan YouTube channel!

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

### Error: "YouTube API Key belum dikonfigurasi"
- Pastikan sudah edit `config.js` dengan API Key yang valid

### Error: "Channel tidak ditemukan"
- Cek nama channel di `CHANNEL_USERNAME` sudah benar
- Pastikan channel public/visible

### Videos tidak muncul
- Cek quota API di Google Cloud Console
- Pastikan YouTube Data API v3 sudah enabled
- Cek console browser untuk error details (F12)

## 📊 API Quota

YouTube API memiliki quota limit gratis:
- **10,000 units per day** (gratis)
- Search request: ~100 units
- Video details: ~1 unit

Website ini menggunakan ~200 units per page load. Cukup untuk ~50 visitors per hari.

## 🛠️ Tech Stack

- HTML5
- CSS3 (Custom styling)
- Vanilla JavaScript
- YouTube Data API v3
- Font Awesome Icons
- Google Fonts (Inter)

## 📄 License

© 2025 Menyanyah Podcast. All rights reserved.
