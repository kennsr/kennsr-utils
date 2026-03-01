### 📄 PRD: KirimWA (WhatsApp Chat without Saving Number)

1. Objective
   A hyper-minimalist, ad-free web tool that allows users to send a WhatsApp message to an unsaved number. It includes a local history feature so users don't lose track of numbers they've recently contacted (e.g., couriers, drivers, one-time buyers).

2. Target Audience
   Anyone in Indonesia. Specifically: Online buyers, small business owners, corporate workers, and anyone tired of saving "Kurir JNE 3" to their phone contacts.

3. Core Features
   •⁠ ⁠Smart Input Field: Automatically strips out spaces, dashes, and standardizes Indonesian prefixes (⁠ 08 ⁠, ⁠ 628 ⁠, ⁠ +628 ⁠) into the correct ⁠ 62 ⁠ format required by the WhatsApp API.
   •⁠ ⁠Pre-filled Message (Optional): A text area to draft a message before opening WhatsApp.
   •⁠ ⁠Local History: Uses browser ⁠ localStorage ⁠ to save the last 10 numbers messaged (with an optional label/name).
   •⁠ ⁠One-Click Redirect: Opens ⁠ https://wa.me/{number}?text={message} ⁠ directly.

4. Technical Constraints
   •⁠ ⁠Frontend: Next.js (React), Tailwind CSS.
   •⁠ ⁠Logic: 100% Client-side. ⁠ localStorage ⁠ for history.
   •⁠ ⁠Speed: Must load instantly.

-

### 🤖 AI Builder Prompt

Copy and paste the text below directly into your AI builder.

Prompt:
⁠ text
Build a client-side web application called "KirimWA", a tool to send WhatsApp messages without saving the contact number, specifically optimized for Indonesian users. Use React, Tailwind CSS, and Lucide icons. The design must be ultra-minimalist, fast, and mobile-first.

**1. Main Action Section:**

- **Number Input:** A large, prominent text input for the phone number.
- **Auto-Formatting Logic:** When the user types or pastes a number, automatically sanitize it. Remove spaces, dashes, and brackets. If the number starts with "08", convert it to "628". If it starts with "+62", remove the "+". Ensure the final output is a clean string starting with "62" (the country code for Indonesia).
- **Message Input (Optional):** A text area below the number for an optional starting message.
- **Action Button:** A large, highly visible green button (using WhatsApp brand color) with a send icon and text: "Chat via WhatsApp".
- **Action Logic:** On click, redirect the user to `https://wa.me/{sanitized_number}?text={URI_encoded_message}`. (Use `window.open(url, '_blank')`).

**2. History Section (Local Storage):**

- Below the main action section, create a "Recent Numbers / Riwayat" section.
- **Save to History:** When the "Chat via WhatsApp" button is clicked, save the sanitized number and a timestamp to the browser's `localStorage`. Maintain only the last 10 entries (FIFO).
- **History UI:** Display the saved history as a clean, vertical list. Each row should show:

1. The phone number.
2. A small input field or label allowing the user to name the number (e.g., "Kurir Gojek", "Buyer Baju"). Save this label back to `localStorage`.
3. A "Chat Again" button (redirects to wa.me).
4. A "Delete" (trash icon) button to remove the row from local storage.

- If history is empty, show a subtle empty state: "Riwayat nomor akan muncul di sini."

**3. Lead Magnet Footer:**

- At the very bottom of the page, place a clean, unobtrusive banner: "KirimWA - Tanpa Iklan, Tanpa Ribet. Dibuat oleh [Your Name]. Butuh jasa pembuatan website atau sistem web app? Hubungi @[YourIG/Twitter]".

**4. Styling:**

- Use a clean white/gray background with modern, soft shadows. The focus should be entirely on the input field and the green send button. No unnecessary visual clutter.
