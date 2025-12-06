# Hotel Reservation Frontend

Modern TypeScript/React frontend for the hotel reservation microservices system.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   └── Navbar/
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   ├── Reservation/
│   │   └── History/
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## 🎨 Design System

### Colors
- **Primary**: #003580 (Deep Blue)
- **Accent**: #0071c2 (Booking Blue)
- **Success**: #008009 (Green)
- **Warning**: #febb02 (Yellow)

### Components
- **Button** - Primary, Secondary, Success variants
- **Card** - Selectable, hoverable cards
- **Input** - Form inputs with labels
- **Badge** - Status indicators
- **Modal** - Overlay modals
- **Navbar** - Navigation header

## 🛠️ Setup & Installation

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Start development server**:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

3. **Build for production**:
```bash
npm run build
```

## 🔌 API Integration

The frontend connects to the Spring Boot microservices via API proxy:

- Hotels: `GET /api/hotels`
- Rooms: `GET /api/rooms`
- Reservations: `GET /api/reservations`, `POST /api/reservations`

Vite dev server proxies `/api` requests to `http://localhost:8080` (API Gateway)

## 📄 Pages

### Home (`/`)
- Hero section with search bar
- Action cards for creating reservations and viewing history
- Microservices architecture overview
- Service endpoints display

### Reservation (`/reserve`)
- Hotel grid with ratings and pricing
- Room selection by hotel
- Booking form (name, dates)
- 3D animated payment modal with credit card preview

### History (`/history`)
- Reservation cards with status badges
- Filter by payment status (All, Paid, Pending)
- Search by customer name
- Statistics dashboard

## 🎯 Features

✅ Booking.com-inspired professional design  
✅ Fully typed with TypeScript  
✅ Responsive mobile-first layout  
✅ 3D credit card animation  
✅ Real-time form validation  
✅ Modular component architecture  
✅ API service layer  
✅ Client-side routing  

## 📦 Build Output

Production build creates optimized static files in `dist/`:
- Minified JavaScript bundles
- Optimized CSS
- Static assets

Deploy `dist/` to any static hosting (Netlify, Vercel, S3, etc.)

## 🔧 Configuration

### Vite Config
- Port: 3000
- API Proxy: localhost:8080
- Path aliases: `@/` → `src/`

### TypeScript Config
- Target: ES2020
- JSX: react-jsx
- Strict mode enabled

---

**Built with ❤️ using React + TypeScript + Vite**
