# 🚨 API KEY FIX - Action Required!

## Problem Ditemukan ✅

API Key kamu: `AIzaSyD07C6L1mnwhAs7_CvmM2Un_jricGLrwzQ`

**Status**: ❌ Di-block karena HTTP Referrer restrictions

**Error**: `API_KEY_HTTP_REFERRER_BLOCKED`

---

## 🔧 Fix Sekarang (2 menit)

### Step 1: Buka Google Cloud Console
https://console.cloud.google.com/apis/credentials

### Step 2: Edit API Key
1. Click pada API Key yang kamu buat
2. Scroll ke **Application restrictions**

### Step 3: Pilih salah satu:

#### ✅ Option A: Allow dari localhost (untuk testing)
Set **HTTP referrers** dengan:
```
http://localhost:8080/*
http://127.0.0.1:8080/*
http://10.3.0.3:8080/*
```

#### ✅ Option B: Allow semua (temporary - hanya untuk test!)
Set **Application restrictions** → **None**

### Step 4: Save
1. Click **Save**
2. Tunggu 2-5 menit
3. Buka browser

---

## 🌐 Testing Website

### Akses dari browser:
```
http://localhost:8080
```

atau dari komputer lain di network yang sama:
```
http://10.3.0.3:8080
```

---

## ✅ Setelah website jalan

Jika mau deploy ke production domain `menyanyah.xyz`:

1. Point domain ke server
2. Setup SSL/HTTPS
3. Update HTTP referrers:
```
https://menyanyah.xyz/*
https://*.menyanyah.xyz/*
```

---

## 🔍 Cara Cek Berhasil atau Tidak

### Buka browser → Tekan F12 → Console Tab

**✅ Jika berhasil:**
```
Website akan muncul:
- Statistik channel (subscribers, views)
- Grid video podcast
- Bisa click video
```

**❌ Jika masih error:**
```
Console akan muncul error merah
Screenshot error tersebut dan kirim ke saya
```

---

## 📞 Need Help?

Jika masih tidak jalan setelah fix di atas:
1. Screenshot console error (F12)
2. Screenshot API Key settings di Google Cloud
3. Share di chat

---

**Current Status:**
- ✅ Server running: `http://10.3.0.3:8080`
- ✅ API Key configured: `AIzaSyD07...`
- ❌ API Key blocked by referrer restrictions

**Action**: Fix referrer restrictions di Google Cloud Console
