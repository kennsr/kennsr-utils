# Kennsr Utilities

Welcome to **Kennsr Utilities**, a collection of free, fast, and easy-to-use digital utilities designed to simplify workflow and business operations for UMKM (Usaha Mikro, Kecil, dan Menengah) in Indonesia.

Built with [Next.js](https://nextjs.org), Tailwind CSS, and Shadcn UI, this project serves as a single portal to access multiple client-side tools.

---

## 🛠️ Available Utilities

### 1. Nota Cepat (Instant Receipt Generator)

A client-side only web application that allows Indonesian online sellers to input transaction details and instantly generate a clean, professional digital receipt (Nota) to download and send via WhatsApp.

- **Live Preview:** Receipt updates in real-time as you type.
- **Auto-Calculation:** Automatically calculates Subtotal, Shipping (Ongkir), and Grand Total.
- **Export:** Converts the receipt into a high-quality, downloadable JPG.

### 2. Hitung HPP (COGS & Profit Calculator)

_(Coming Soon - In Development)_
A Cost of Goods Sold (COGS) and profit margin calculator tailored for Indonesian food and bakery businesses.

- **Dynamic Ingredients & Overhead:** Add multiple ingredients and operational costs.
- **Auto-Costing:** Calculates exact cost based on amount used vs amount bought.
- **Profit Targeting:** Suggests highly visible selling prices based on desired margins.

### 3. WA Link Generator

_(Coming Soon)_
Instantly create customized WhatsApp short-links with pre-filled messages.

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Kennsr Utilities portal.

## 🎨 Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Theming**: Dark/Light mode via `next-themes`
- **Utilities**: `html-to-image` for client-side receipt JPG generation

## 📈 Deployment

This application is configured for static export (`output: "export"`) allowing it to be hosted on static platforms like GitHub Pages, Vercel, or standard CDNs.

To build the static export:

```bash
npm run build
```

The output will be found in the `out/` or `.next/server/app/` directory based on your hosting configuration.

---

_Dibuat via Kennsr Utilities | Butuh website? Hubungi via WA (+6281282411257) / IG (@kenn.sr)_
