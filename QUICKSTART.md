# 🚀 Quick Start Guide - Menyanyah Podcast Website

## Setup Cepat (5 menit)

### 1️⃣ Dapatkan YouTube API Key

1. Buka https://console.cloud.google.com/
2. Login dengan Google Account
3. Klik **Create Project** atau pilih project yang ada
4. Di sidebar, klik **APIs & Services** → **Library**
5. Cari **"YouTube Data API v3"** → Klik → **Enable**
6. Klik **Credentials** di sidebar
7. Klik **Create Credentials** → **API Key**
8. **Copy** API Key yang muncul

### 2️⃣ Konfigurasi Website

1. Buka file `config.js`
2. Ganti baris ini:
```javascript
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY_HERE';
```

Menjadi (paste API Key kamu):
```javascript
const YOUTUBE_API_KEY = 'AIzaSyD..........'; // API Key kamu
```

3. Save file

### 3️⃣ Test Website

Buka browser dan akses:
```
http://localhost:8080
```

atau jika sudah di server:
```
https://menyanyah.xyz
```

## ✅ Cek Apakah Sudah Jalan

Website berhasil jika:
- ✅ Muncul statistik channel (subscribers, videos, views)
- ✅ Muncul grid podcast episodes dengan thumbnail
- ✅ Click episode → video play di modal popup
- ✅ Button "Load More" muncul jika ada lebih banyak video

## ❌ Troubleshooting

### "YouTube API Key belum dikonfigurasi"
→ Edit `config.js` dengan API Key yang benar

### "Channel tidak ditemukan"
→ Cek nama channel di `script.js` (baris 4):
```javascript
const CHANNEL_USERNAME = 'menyanyahpodcast';
```

### Episodes tidak muncul / Error 403
→ Pastikan YouTube Data API v3 sudah **Enabled** di Google Cloud Console

### Error 429 (Quota exceeded)
→ API quota habis untuk hari ini. YouTube API gratis punya limit:
- 10,000 units/day
- Reset setiap midnight Pacific Time

## 🔒 Tips Keamanan (Production)

Di Google Cloud Console → Credentials → Edit API Key:

**1. Application restrictions:**
- Pilih: **HTTP referrers**
- Add: `menyanyah.xyz/*`
- Add: `*.menyanyah.xyz/*`

**2. API restrictions:**
- Pilih: **Restrict key**
- Select: **YouTube Data API v3** only

## 📁 File Structure

```
/var/www/html/menyanyah.xyz/
├── index.html          # Main HTML
├── style.css           # All styling
├── script.js           # YouTube API integration
├── config.js           # API Key (jangan commit!)
├── config.example.js   # Template untuk config.js
├── README.md           # Full documentation
├── QUICKSTART.md       # This file
└── .gitignore         # Git ignore untuk config.js
```

## 🎯 Next Steps

1. **Custom Domain**: Point domain menyanyah.xyz ke server
2. **SSL Certificate**: Setup HTTPS dengan Let's Encrypt
3. **Analytics**: Add Google Analytics untuk tracking visitors
4. **SEO**: Optimize meta tags untuk search engines
5. **PWA**: Make it installable (Progressive Web App)

## 🆘 Need Help?

- YouTube API Docs: https://developers.google.com/youtube/v3
- Test API: https://developers.google.com/youtube/v3/docs/search/list

## 💡 Fitur Auto-Update

Website ini **OTOMATIS UPDATE** setiap kali:
- Ada pengunjung baru (fetch latest data)
- User klik "Load More" (pagination)
- Tidak perlu manual update!

Data diambil langsung dari YouTube channel @menyanyahpodcast.

---

**Happy Podcasting! 🎙️**
