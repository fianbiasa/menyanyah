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

1. Buka file `api.php`
2. Di **baris 8**, ganti dengan API Key kamu:
```php
const YOUTUBE_API_KEY = 'AIzaSyD...'; // Paste API Key kamu di sini
```

3. Save file

**Keuntungan**: API Key tersimpan di backend PHP, **tidak bisa dilihat** oleh pengunjung!

### 3️⃣ Persyaratan Server

Pastikan server Anda memiliki:
- ✅ **PHP 7.4+** installed
- ✅ **curl extension** aktif
- ✅ **Web server** (Apache/Nginx) yang support PHP

Cek PHP:
```bash
php -v
php -m | grep curl
```

### 4️⃣ Test Website

Buka browser dan akses:
```
http://localhost/menyanyah.xyz
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

### "Internal Server Error" / Error 500
→ **Cek PHP installed**: `php -v`
→ **Cek curl extension**: `php -m | grep curl`
→ **Cek error log**: `/var/log/apache2/error.log`
→ **Edit API Key** di `api.php` (bukan `config.js`)

### "Channel tidak ditemukan"
→ Cek nama channel di `script.js` (baris 4):
```javascript
const CHANNEL_USERNAME = 'menyanyahpodcast';
```

### Episodes tidak muncul / Error 403
→ Pastikan YouTube Data API v3 sudah **Enabled** di Google Cloud Console
→ Cek API Key di `api.php` sudah benar

### Error 429 (Quota exceeded)
→ API quota habis untuk hari ini. YouTube API gratis punya limit:
- 10,000 units/day
- Reset setiap midnight Pacific Time

### API Key masih terlihat?
→ **TIDAK!** Jika Anda menggunakan `api.php`, API Key tersimpan di server
→ Cek dengan View Source - tidak akan ada API Key di HTML/JavaScript

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
├── index.php           # Main file (PHP)
├── api.php             # Backend proxy (simpan API Key di sini!) 🔒
├── style.css           # All styling
├── script.js           # Frontend JavaScript
├── config.example.js   # Example config (deprecated)
├── README.md           # Full documentation
├── QUICKSTART.md       # This file
└── TROUBLESHOOTING.md  # Advanced troubleshooting
```

**⚠️ Penting**: File `config.js` sudah **tidak digunakan lagi**. API Key sekarang di `api.php` (backend).

## 🎯 Next Steps

1. **Amankan API Key**: Batasi di Google Cloud Console (HTTP referrers)
2. **SSL Certificate**: Setup HTTPS dengan Let's Encrypt
3. **Backup `api.php`**: Simpan file ini dengan aman (berisi API Key)
4. **Analytics**: Add Google Analytics untuk tracking visitors
5. **SEO**: Optimize meta tags untuk search engines
6. **Monitoring**: Setup uptime monitoring untuk website

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
