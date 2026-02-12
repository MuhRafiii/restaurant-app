🍽 Restaurant App

Aplikasi manajemen restoran berbasis:

Backend: Laravel (REST API)

Frontend: React (Vite) + TailwindCSS

Database: MySQL

📌 Features
Backend (API)

Login Multiple Role (Pelayan & Kasir)

CRUD Makanan

List Meja

Open Order

Detail Order

Tambah Makanan ke Order

Tutup Order

List Order (Kasir)

Generate Receipt PDF

Frontend

Login

Dashboard Meja & Status

Master Makanan (Waiter)

List Order (Kasir)

Detail Order

Tambah Menu ke Order

Download Receipt PDF

Private Route & Role Protection

🗂 Project Structure
restaurant-app/
│
├── backend/ → Laravel API
└── frontend/ → React App (Vite)

🚀 BACKEND SETUP (Laravel API)

Masuk ke folder backend:

cd backend

1️⃣ Install Dependency
composer install

2️⃣

Lalu atur database di .env:

DB_DATABASE=restaurant_app
DB_USERNAME=root
DB_PASSWORD=

3️⃣ Generate App Key
php artisan key:generate

4️⃣ Migration & Seeder
php artisan migrate
php artisan db:seed

Seeder akan membuat:

User pelayan

User kasir

Data meja

5️⃣

6️⃣ Jalankan Server
php artisan serve

Backend berjalan di:

http://localhost:8000

API Base URL:

http://localhost:8000/api

🔐 Default Login

Contoh:

Pelayan
email: pelayan@test.com
password: password

Kasir
email: kasir@test.com
password: password

🎨 FRONTEND SETUP (React + Tailwind)

Masuk ke folder frontend:

cd frontend

1️⃣ Install Dependency
npm install

2️⃣ Install TailwindCSS
npm install tailwindcss @tailwindcss/vite

Edit vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
plugins: [
tailwindcss(),
],
})

Edit src/index.css
@import "tailwindcss";

Edit index.html

<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/src/style.css" rel="stylesheet">
    </head>
    <body>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
    </body>
</html>

Pastikan di main.jsx sudah import:

import "./index.css";

3️⃣ Setup Axios Base URL

File:

src/services/api.js

Pastikan baseURL:

baseURL: "http://localhost:8000/api"

4️⃣ Jalankan Frontend
npm run dev

Frontend berjalan di:

http://localhost:5173

🔒 Authentication & Route Protection

Frontend menggunakan:

LocalStorage untuk token

PrivateRoute untuk proteksi halaman

Axios interceptor untuk auto logout jika 401 / 403

Jika token dihapus atau expired:
→ otomatis redirect ke /login

👥 Role Access
👨‍🍳 Pelayan

Dashboard

Master Makanan

Detail Order

Tambah Menu ke Order

Tutup Order

💰 Kasir

Dashboard

List Order

Detail Order

Download Receipt PDF

🧾 Generate Receipt

Endpoint:

GET /api/orders/{id}/receipt

Frontend akan:

Request sebagai blob

Auto download file PDF

🛠 Tech Stack
Backend

Laravel

Sanctum (Token Auth)

MySQL

DomPDF (Receipt)

Frontend

React (Vite)

TailwindCSS

Axios

React Router

📦 API Endpoints Summary
Method Endpoint Description
POST /login Login user
GET /tables List meja
GET /foods List makanan
POST /foods Create makanan
PUT /foods/{id} Update makanan
DELETE /foods/{id} Delete makanan
POST /orders/open Open order
GET /orders/{id} Detail order
POST /orders/{id}/items Add item
POST /orders/{id}/close Close order
GET /orders List order
GET /orders/{id}/receipt Generate PDF
🧪 Development Flow

Login sebagai waiter

Buka meja kosong

Tambah menu

Tutup order

Login sebagai cashier

Lihat list order

Download receipt

📝 Commit Convention

Contoh commit yang digunakan:

feat(frontend): dashboard and table status page
feat(frontend): order and food management pages
feat(frontend): add private route and auth guard
feat(frontend): add role-based navbar component

⚙️ Requirements

PHP >= 8.x

Composer

Node.js >= 18

MySQL

XAMPP / Laragon (opsional)

✅ Final Checklist

Backend berjalan

Migration & Seeder sukses

Frontend bisa login

Role-based access berjalan

Order flow berjalan

Receipt PDF bisa didownload

📌 Notes

Pastikan:

Backend running sebelum frontend

Port backend sesuai dengan baseURL di axios

CORS tidak diblokir (Laravel sudah default allow localhost)
