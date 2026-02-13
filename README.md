# 🍽 Restaurant App

Aplikasi manajemen restoran berbasis:

- Backend: Laravel (REST API)
- Frontend: React (Vite) + TailwindCSS
- Database: MySQL

Aplikasi memiliki dua role:

- 👨‍🍳 Pelayan
- 💰 Kasir

---

# 📌 Features

## Backend (API)

- Login Multiple Role (Pelayan & Kasir)
- CRUD Makanan
- List Meja
- Open Order
- Detail Order
- Tambah Makanan ke Order
- Tutup Order
- List Order (Kasir)
- Generate Receipt PDF

## Frontend

- Login
- Dashboard Meja & Status
- Master Makanan (Waiter)
- List Order (Kasir)
- Detail Order
- Tambah Menu ke Order
- Download Receipt PDF
- Private Route & Role Protection

---

# 🗂 Project Structure

```
restaurant-app/
│
├── backend/     → Laravel REST API
└── frontend/    → React App (Vite + Tailwind)
```

---

# 🚀 BACKEND SETUP (Laravel API)

Masuk ke folder backend:

```bash
cd backend
```

## 1. Install Dependency

```bash
composer install
```

## 2. Install Laravel Sanctum

Sanctum digunakan untuk authentication berbasis token.

```bash
composer require laravel/sanctum
```

## 3. Install DomPDF

Digunakan untuk generate receipt PDF.

```bash
composer require barryvdh/laravel-dompdf
```

## 4. Copy Environment File

```bash
cp .env.example .env
```

## 5. Konfigurasi Database

Edit file `.env`:

```
DB_DATABASE=restaurant_app
DB_USERNAME=root
DB_PASSWORD=
DB_COLLATION=utf8mb4_unicode_ci
```

Pastikan database `restaurant_app` sudah dibuat di MySQL.

## 6. Generate App Key

```bash
php artisan key:generate
```

## 7. Migration & Seeder

```bash
php artisan migrate
php artisan db:seed
```

Seeder akan membuat:

- User pelayan
- User kasir
- Data meja
- Data makanan

## 8. Jalankan Server

```bash
php artisan serve
```

Backend berjalan di:

```
http://localhost:8000
```

Base API URL:

```
http://localhost:8000/api
```

---

# 🔐 Default Login (Seeder)

## 👨‍🍳 Pelayan

```
email: pelayan@test.com
password: password
```

## 💰 Kasir

```
email: kasir@test.com
password: password
```

---

# 🎨 FRONTEND SETUP (React + Tailwind)

Masuk ke folder frontend:

```bash
cd frontend
```

## 1. Install Dependency

```bash
npm install
```

## 2. Install TailwindCSS

```bash
npm install tailwindcss @tailwindcss/vite
```

## 3. Setup Axios Base URL

File:

```
src/services/api.js
```

Pastikan baseURL:

```js
baseURL: "http://localhost:8000/api",
```

atau buat file .env:

```
VITE_API_URL=http://localhost:8000/api
```

## 4. Jalankan Frontend

```bash
npm run dev
```

Frontend berjalan di:

```
http://localhost:5173
```

---

# 🔒 Authentication & Route Protection

Frontend menggunakan:

- LocalStorage untuk menyimpan token
- PrivateRoute untuk proteksi halaman
- Axios interceptor untuk auto logout jika response 401 / 403

Jika token dihapus atau expired → otomatis redirect ke halaman login.

---

# 👥 Role Access

## 👨‍🍳 Pelayan

- Dashboard
- Master Makanan
- Detail Order
- Tambah Menu ke Order
- Tutup Order

## 💰 Kasir

- Dashboard
- List Order
- Detail Order
- Download Receipt PDF

---

# 🧾 Generate Receipt PDF

Endpoint:

```
GET /api/orders/{id}/receipt
```

Frontend akan:

- Request sebagai blob
- Otomatis download file PDF

---

# 📦 API Endpoints Summary

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| POST   | /login               | Login user     |
| GET    | /tables              | List meja      |
| GET    | /foods               | List makanan   |
| POST   | /foods               | Create makanan |
| PUT    | /foods/{id}          | Update makanan |
| DELETE | /foods/{id}          | Delete makanan |
| POST   | /orders/open         | Open order     |
| GET    | /orders/{id}         | Detail order   |
| POST   | /orders/{id}/items   | Add item       |
| POST   | /orders/{id}/close   | Close order    |
| GET    | /orders              | List order     |
| GET    | /orders/{id}/receipt | Generate PDF   |

---

# 🧪 Development Flow

1. Login sebagai pelayan
2. Buka meja kosong
3. Tambah menu ke order
4. Tutup order
5. Login sebagai kasir
6. Lihat list order
7. Download receipt PDF

---

# ⚙️ Requirements

- PHP >= 8.x
- Composer
- Node.js >= 18
- MySQL
- XAMPP / Laragon (opsional)

---

# ✅ Final Checklist

- [x] Backend berjalan
- [x] Migration & Seeder sukses
- [x] Frontend bisa login
- [x] Role-based access berjalan
- [x] Order flow berjalan
- [x] Receipt PDF bisa didownload

---

🚀 Project siap dijalankan.
