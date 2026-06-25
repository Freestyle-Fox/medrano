# 🍔 Medrano's Burgers — Full Stack Next.js App

## Stack
- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Icons**: Lucide React

---

## Setup Instructions

### 1. Copy files into your project
Replace all files in `C:\Users\Vicky kumar\Downloads\medranos\medranos\` with these.

### 2. Install dependencies
```bash
npm install
```

### 3. Create your .env.local file
Create a file called `.env.local` in the root folder with:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.d0csakc.mongodb.net/medranos?retryWrites=true&w=majority
```
Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your MongoDB Atlas credentials.

### 4. Seed the database
Start the dev server, then visit:
```
http://localhost:3000/api/seed
```
This will add 14 products to your MongoDB database.

### 5. Run the app
```bash
npm run dev
```

---

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| Menu | `/menu` |
| Checkout | `/order` |
| Reservations | `/reservations` |
| About | `/about` |
| **Admin Dashboard** | `/admin` |
| **Admin Products** | `/admin/products` |
| **Admin Orders** | `/admin/orders` |
| **Admin Reservations** | `/admin/reservations` |

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id` | Update order status |
| DELETE | `/api/orders/:id` | Delete order |
| GET | `/api/reservations` | Get all reservations |
| POST | `/api/reservations` | Create reservation |
| PUT | `/api/reservations/:id` | Update reservation status |
| DELETE | `/api/reservations/:id` | Delete reservation |
| GET | `/api/seed` | Seed database with sample products |
