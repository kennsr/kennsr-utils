### 📄 PRD: QR Generator Pro (Professional QR Code Generator)

1. **Objective**
   A client-side only web application that allows users to generate professional, customizable QR codes instantly. Users can create QR codes for URLs, text, WiFi credentials, vCards, and more with full customization options (colors, logos, frames).

2. **Target Audience**
   - UMKM owners creating marketing materials
   - Restaurant owners for digital menus
   - Event organizers for ticketing/check-in
   - Small businesses for contactless payments
   - Anyone needing quick, professional QR codes

3. **Core Features**
   - **No Authentication**: 100% free, immediate access, no watermarks
   - **Multiple QR Types**: URL, Text, WiFi, Email, Phone, vCard, WhatsApp
   - **Live Preview**: QR code updates in real-time as user customizes
   - **Customization**: 
     - Foreground/background colors
     - Size selection (S, M, L, XL)
     - Error correction levels (L, M, Q, H)
     - Optional logo upload (center overlay)
     - Frame/border options
   - **Export Options**: PNG, SVG, PDF download in high resolution
   - **History**: Local storage saves last 10 generated QR codes
   - **Lead Magnet**: Subtle branding on export page (not on QR itself)

4. **Technical Constraints**
   - **Frontend**: Next.js (React), Tailwind CSS, Shadcn UI
   - **Logic**: 100% Client-side. No database. No backend.
   - **Dependencies**: `qrcode` or `qrcode-generator` (for QR generation), `html-to-image` (for export), `lucide-react` (icons)
   - **Performance**: Must generate QR codes instantly (<100ms)

---

### 🤖 AI Builder Prompt

Copy and paste the text below directly into your AI builder.

**Prompt:**

```text
Build a client-side only web application called "QR Generator Pro", a professional QR code generator with advanced customization options. Use React, Tailwind CSS, and Lucide icons. The app must be fully responsive, mobile-first, and have an enterprise-level UI/UX.

**Layout Structure (Desktop & Mobile):**

- On Desktop: Two-column layout. Left column is the Configuration Panel (sticky on scroll). Right column is the Live QR Preview with export options.
- On Mobile: Single column. Configuration at top, Live Preview below with sticky export button.

**1. Configuration Panel (Left):**

Create a clean, modern form with tabs or accordion sections:

**Section A: QR Type Selector**
- Radio buttons or cards to select QR type: URL, Text, WiFi, Email, Phone, vCard, WhatsApp
- Show/hide relevant fields based on selection

**Section B: Content Fields (Dynamic based on type)**
- URL: Single URL input with validation
- Text: Multiline textarea
- WiFi: SSID, Password, Encryption type (WPA/WEP/None)
- Email: Email address, Subject, Body
- Phone: Phone number input
- vCard: Name, Organization, Phone, Email, URL, Address
- WhatsApp: Phone number + Pre-filled message

**Section C: Design Customization**
- Colors: Two color pickers (foreground, background) with preset swatches
- Size: Slider or select (256px, 512px, 1024px, 2048px)
- Error Correction: Select (Low, Medium, Quartile, High) with info tooltip
- Logo Upload: Optional file input for center logo (auto-scales, max 30% of QR size)
- Quiet Zone: Slider for border/margin size (0-4)

**2. Live QR Preview Section (Right):**

Create a visually distinct card showing the real-time QR code:

- Large, centered QR code preview with smooth transitions on change
- Display current configuration summary below QR
- Scannable indicator (green checkmark when valid)
- Quick test: "Scan to Test" button that shows the QR content in a modal

**3. Export Section:**

Place prominent export buttons below the preview:

- Format Selection: PNG, SVG, PDF
- Download Button: Large primary button "Download QR Code"
- On click: Generate high-resolution file, name it "QR-[type]-[timestamp].ext"
- Include "Copy to Clipboard" option for PNG

**4. History Section (Local Storage):**

- Below main UI, create "Recent QR Codes" section
- Save last 10 generated QRs with: type, content preview, timestamp, config snapshot
- Display as grid of thumbnails
- Click to reload configuration
- Clear history button

**5. Lead Magnet Footer:**

- At bottom of page, clean banner: "QR Generator Pro - Gratis, Tanpa Watermark. Butuh website untuk bisnismu? Hubungi @kenn.sr"

**6. Styling & UX:**

- Use modern, clean design with subtle shadows and rounded corners
- Smooth animations when switching tabs/types
- Loading states during generation (skeleton screens)
- Toast notifications for actions (copied, downloaded, error)
- Dark mode support
- Accessible (keyboard navigation, ARIA labels)

**7. Functionality:**

- Real-time QR generation on every input change (debounced 200ms)
- Input validation with clear error messages
- Handle edge cases (empty fields, invalid URLs, etc.)
- Logo overlay: Center logo with white padding for scan reliability
- High DPI export for print quality
```

---

## Success Metrics

- QR generation < 100ms
- Export completes in < 2 seconds
- Mobile-responsive with touch-friendly controls
- All QR codes pass scan testing on major QR readers
- Lighthouse score > 90 on performance, accessibility, best practices
