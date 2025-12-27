# 🔧 Troubleshooting - Menyanyah Podcast Website

## ❌ Problem: "YouTube API Key belum dikonfigurasi"

### Penyebab yang ditemukan:
API Key kamu sudah di-restrict dengan **HTTP Referrer**, jadi hanya bisa dipanggil dari browser dengan referrer yang benar.

Error yang muncul:
```
"API_KEY_HTTP_REFERRER_BLOCKED"
"Requests from referer <empty> are blocked"
```

---

## ✅ Solusi 1: Setup HTTP Referrer dengan Benar (RECOMMENDED)

### Di Google Cloud Console:

1. Buka: https://console.cloud.google.com/apis/credentials
2. Click pada API Key kamu
3. Di **Application restrictions**, pilih **HTTP referrers**
4. Tambahkan referrer berikut:

```
http://localhost:8080/*
http://127.0.0.1:8080/*
https://menyanyah.xyz/*
https://*.menyanyah.xyz/*
```

5. Scroll ke **API restrictions**
6. Pilih **Restrict key**
7. Centang hanya: **YouTube Data API v3**
8. Click **Save**

### Testing:
1. Buka browser
2. Akses: `http://localhost:8080` atau `http://IP_SERVER:8080`
3. Buka Console (F12) → Tab Console
4. Cek apakah ada error merah
5. Jika masih error, lanjut ke Solusi 2

---

## ✅ Solusi 2: Hapus Restriction (TEMPORARY - untuk testing)

**⚠️ WARNING: Hanya untuk testing, jangan untuk production!**

### Di Google Cloud Console:

1. Buka: https://console.cloud.google.com/apis/credentials
2. Click pada API Key kamu
3. Di **Application restrictions**, pilih **None**
4. Di **API restrictions**, tetap pilih **Restrict key** → **YouTube Data API v3**
5. Click **Save**
6. Tunggu 2-5 menit (propagation time)
7. Refresh website

### Setelah testing berhasil:
- Kembalikan ke HTTP referrers restrictions (Solusi 1)

---

## ✅ Solusi 3: Buat API Key Baru (Fresh Start)

Jika masih tidak jalan:

1. Buka: https://console.cloud.google.com/apis/credentials
2. Click **+ CREATE CREDENTIALS** → **API Key**
3. Copy API Key yang baru
4. Click **RESTRICT KEY**
5. Setup seperti Solusi 1
6. Ganti di `config.js`:

```javascript
const YOUTUBE_API_KEY = 'PASTE_API_KEY_BARU_DISINI';
```

---

## 🔍 Cara Debug di Browser

### 1. Buka Console (F12)

```javascript
// Check apakah API key terbaca
console.log(YOUTUBE_API_KEY);
// Output: "AIzaSy..."  ← Harus muncul key kamu

// Test manual fetch channel
fetch('https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=menyanyahpodcast&key=' + YOUTUBE_API_KEY)
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));
```

### 2. Lihat Network Tab

- Buka tab **Network**
- Refresh halaman
- Cari request ke `googleapis.com`
- Click → lihat **Response**
- Jika error 403 → Problem di API key restrictions

### 3. Check Error Messages

Error yang mungkin muncul:

| Error | Penyebab | Solusi |
|-------|----------|--------|
| `API_KEY_HTTP_REFERRER_BLOCKED` | Referrer tidak match | Solusi 1 |
| `API_KEY_INVALID` | API key salah | Check config.js |
| `quotaExceeded` | Quota habis | Tunggu besok |
| `Channel not found` | Username salah | Check CHANNEL_USERNAME |

---

## 🌐 Testing dari Different Environments

### Local Testing (Laptop/PC):
```bash
# Start server
cd /var/www/html/menyanyah.xyz
python3 -m http.server 8080

# Buka browser:
http://localhost:8080
```

### Remote Server Testing:
```bash
# Akses dari browser:
http://IP_SERVER:8080
# atau
https://menyanyah.xyz
```

### Allowed Referrers untuk Production:
```
https://menyanyah.xyz/*
https://www.menyanyah.xyz/*
http://localhost:8080/*       # untuk local dev
```

---

## 📊 Check API Quota

1. Buka: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas
2. Lihat **Queries per day**
3. Limit gratis: **10,000 units/day**
4. Usage per page load: ~200 units

**Tip**: Jika quota habis, reset otomatis setiap hari jam 12:00 AM Pacific Time.

---

## ✅ Checklist Debug

Cek satu per satu:

- [ ] YouTube Data API v3 sudah **Enabled** di Google Cloud
- [ ] API Key sudah di-paste di `config.js`
- [ ] File `config.js` sudah di-load di browser (lihat Network tab)
- [ ] Tidak ada typo di API key
- [ ] HTTP referrers sudah di-setup dengan benar
- [ ] API restrictions: **YouTube Data API v3** only
- [ ] Quota masih ada (belum habis)
- [ ] Browser console tidak ada error CORS
- [ ] Channel username: `menyanyahpodcast` (cek di script.js)

---

## 🆘 Still Not Working?

### Quick Test - Bypass restrictions temporarily:

Edit `script.js` untuk debug:

```javascript
// Add di baris paling atas di function init()
async function init() {
    console.log('🔧 DEBUG - API Key:', YOUTUBE_API_KEY);
    console.log('🔧 DEBUG - Channel:', CHANNEL_USERNAME);
    
    // ... rest of code
}
```

Refresh browser → Buka Console → Screenshot error → Share di chat.

---

## 💡 Pro Tips

1. **Selalu test di browser**, bukan di curl/terminal
2. **Tunggu 2-5 menit** setelah update API restrictions
3. **Hard refresh** browser: Ctrl+Shift+R (Chrome) atau Cmd+Shift+R (Mac)
4. **Clear cache** jika masih issue
5. **Gunakan Incognito** untuk test fresh

---

**Website URL**: http://localhost:8080  
**API Console**: https://console.cloud.google.com/apis/credentials
