### 📄 PRD: Nota Cepat (Instant Receipt Generator)

1. Objective
   A client-side only web application that allows Indonesian online sellers (UMKM) to input transaction details and instantly generate a clean, professional digital receipt (Nota) to download and send via WhatsApp.

2. Target Audience
   Instagram/WhatsApp shop owners operating primarily from their mobile phones.

3. Core Features
   •⁠ ⁠No Authentication: 100% free, immediate access.
   •⁠ ⁠Live Preview: As the user types, the receipt updates in real-time.
   •⁠ ⁠Dynamic Item List: Ability to add/remove multiple products.
   •⁠ ⁠Auto-Calculation: Automatically calculates Subtotal, Shipping (Ongkir), and Grand Total in IDR (Rupiah) format.
   •⁠ ⁠Image Export: Converts the HTML receipt component into a downloadable JPG/PNG.
   •⁠ ⁠Lead Magnet: A permanent, uneditable footer on the receipt advertising your web development services.

4. Technical Constraints
   •⁠ ⁠Frontend: Next.js (React), Tailwind CSS, Shadcn UI (or similar modern UI library).
   •⁠ ⁠Logic: 100% Client-side. No database. No backend.
   •⁠ ⁠Dependencies: ⁠ html-to-image ⁠ (for export), ⁠ lucide-react ⁠ (for icons).

-

### 🤖 AI Builder Prompt

Copy and paste the text below directly into your AI builder.

Prompt:
⁠ text
Build a client-side only web application called "Nota Cepat", a digital receipt generator for Indonesian online sellers. Use React, Tailwind CSS, and Lucide icons. The app must be fully responsive and mobile-first.

**Layout Structure (Desktop & Mobile):**

- On Desktop: Two-column layout. Left column is the Input Form. Right column is the Live Receipt Preview (sticky on scroll).
- On Mobile: Single column. Input Form at the top, Live Receipt Preview below it.

**1. Input Form Section (Left):**
Create a clean form with the following fields:

- Store Information: Store Name (text), Instagram Handle / Phone (text).
- Customer Information: Customer Name (text), Date (date picker, defaults to today).
- Order Items (Dynamic List): A section where users can add multiple items. Each item needs: Item Name (text), Quantity (number), Price per item (number). Include a "Remove" button (trash icon) for each item, and an "Add New Item" button.
- Additional Costs: Shipping Fee / Ongkir (number).

**2. Live Receipt Preview Section (Right):**
Create a visually distinct card that looks like a clean, minimalist digital invoice or thermal receipt. It must strictly reflect the state of the input form.

- Formatting: Format all currency as Indonesian Rupiah (Rp X.XXX.XXX).
- Header: Display Store Name (bold, large) and Instagram/Phone below it.
- Meta: Display Customer Name and Date.
- Table/List: Show the items, Qty x Price, and line total.
- Summary: Show Subtotal, Shipping Fee (Ongkir), and Grand Total (bold).
- Footer (Crucial): At the very bottom of the receipt, add this exact text in small, muted font: "Dibuat via notacepat.com | Butuh website untuk bisnismu? DM @[YourIG/Twitter]"
- Add an ID or Ref to this specific receipt container div so it can be captured.

**3. Functionality:**

- State Management: Manage the form state so the receipt updates instantly on every keystroke. Auto-calculate line totals, subtotal, and grand total.
- Export to Image: Place a large, prominent primary button below the receipt preview that says "Download Nota (JPG)". When clicked, use a library like `html-to-image` (or implement a canvas capture) to convert ONLY the receipt container div into a high-quality JPG and trigger a download to the user's device. Name the file "Nota-[CustomerName].jpg".

Make the UI modern, clean, and utilizing standard Tailwind utility classes. Use a white background for the receipt preview so it exports cleanly.
