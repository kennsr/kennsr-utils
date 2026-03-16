Build a client-side web application called "Hitung HPP", a Cost of Goods Sold (COGS) and profit margin calculator for Indonesian food and bakery businesses. Use React, Tailwind CSS, and Lucide icons. The app must be fully responsive, mobile-first, and look modern and clean.

**Layout Structure:**

- Single page layout. The top half contains the input sections (Recipe, Ingredients, Overhead). The bottom half (or a sticky bottom bar on mobile, right column on desktop) contains the "Results Dashboard".

**1. Input Sections:**

_Section A: Info Resep (Recipe Info)_

- Product Name (text)
- Yield/Hasil Resep: How many portions/pieces does this recipe make? (number).

_Section B: Bahan Baku (Raw Ingredients - Dynamic List)_

- Users can add multiple ingredients. For each ingredient, require 4 fields:

1. Nama Bahan (text, e.g., "Tepung Terigu")
2. Harga Beli (number, e.g., 15000)
3. Berat/Jumlah Beli (number, e.g., 1000) & Satuan (dropdown: gram, ml, pcs)
4. Dipakai di Resep (number, e.g., 200) - meaning how much of it was actually used.

- Auto-calculate the "Cost Used" for that line item: (Harga Beli / Berat Beli) \* Dipakai di Resep. Display this line cost next to the item.
- Include a "Remove" button and an "Add Ingredient" button.

_Section C: Kemasan & Operasional (Packaging & Overhead - Dynamic List)_

- Similar dynamic list, but simpler. Fields: Nama Pengeluaran (text, e.g., "Box Kue", "Gas/Listrik", "Tenaga Kerja"), Biaya (number).

_Section D: Target Keuntungan (Profit Margin)_

- Desired Profit Margin % (number input or slider, default 40%).

**2. Results Dashboard (The Output):**
Create a highly visible, visually distinct summary card that updates in real-time. Format all currency in Indonesian Rupiah (Rp).

- Total Biaya Resep (Total Recipe Cost): Sum of all used ingredients + overhead.
- HPP per Porsi (COGS per portion): Total Biaya Resep / Yield.
- Target Keuntungan (Profit Target): HPP per Porsi \* (Margin % / 100).
- **Harga Jual Disarankan (Suggested Selling Price):** (HPP per Porsi + Profit Target). Make this the largest, most prominent number on the screen.

**3. Lead Magnet Footer:**

- At the bottom of the app, place a clean banner: "Kalkulator ini gratis untuk bantu UMKM. Butuh website katalog atau sistem order otomatis untuk bisnismu? Hubungi @[YourIG/Twitter]".

**4. Functionality:**

- All math must update instantly via state management when any input changes.
- Ensure division by zero is handled safely (e.g., if Yield is 0, show Rp 0).
- Add a "Reset Data" button to clear the form.
