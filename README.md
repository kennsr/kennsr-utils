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

A Cost of Goods Sold (COGS) and profit margin calculator tailored for Indonesian food and bakery businesses.

- **Dynamic Ingredients & Overhead:** Add multiple ingredients and operational costs.
- **Auto-Costing:** Calculates exact cost based on amount used vs amount bought.
- **Profit Targeting:** Suggests highly visible selling prices based on desired margins.

### 3. KirimWA (WhatsApp Link Generator)

Instantly create WhatsApp chat links without saving the contact number. Optimized for Indonesian users.

- **Auto Formatting:** Converts local Indonesian numbers (08xx) to international format (628xx).
- **Local History:** Saves recent numbers in browser storage.
- **Pre-filled Messages:** Optional custom message templates.

### 4. QR Generator Pro

Generate professional, customizable QR codes for various purposes.

- **Multiple Types:** URL, Text, WiFi, Email, Phone, vCard, WhatsApp.
- **Customization:** Colors, sizes, error correction, logo overlay.
- **Export Options:** PNG, JPG, SVG formats with high resolution.

### 5. PassGen Secure

Generate cryptographically strong passwords with advanced security features.

- **Client-Side Only:** Passwords never leave your device.
- **Breach Checking:** Optional HIBP API integration with k-anonymity.
- **Encrypted Vault:** Secure local storage with master password protection.

### 6. CompressIMG Pro

Compress and optimize images without quality loss, entirely in your browser.

- **Batch Processing:** Compress up to 20 images simultaneously.
- **Format Support:** JPEG, PNG, WebP, AVIF input/output.
- **Privacy First:** Images never leave your device.

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
