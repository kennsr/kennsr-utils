### 📄 PRD: PassGen Secure (Password Generator)

1. **Objective**
   A client-side only web application that generates cryptographically strong, customizable passwords instantly. Includes password strength analysis, breach checking (via Have I Been Pwned API), and secure local storage for generated passwords.

2. **Target Audience**
   - General internet users needing strong passwords
   - UMKM owners managing multiple accounts
   - Anyone concerned about online security
   - People replacing weak/reused passwords

3. **Core Features**
   - **No Authentication**: 100% free, no data sent to servers
   - **Smart Generation**: Cryptographically secure random generation
   - **Customization**: Length, character types, patterns, exclusions
   - **Strength Meter**: Real-time entropy calculation + visual feedback
   - **Breach Check**: Optional k-anonymity check against HIBP database
   - **Password Analysis**: Analyze existing passwords for strength
   - **Local Vault**: Encrypted localStorage for saving generated passwords
   - **Export**: Copy to clipboard, download as encrypted file
   - **Lead Magnet**: Security tips + service promotion

4. **Technical Constraints**
   - **Frontend**: Next.js (React), Tailwind CSS, Shadcn UI
   - **Logic**: 100% Client-side. No server-side password processing.
   - **Dependencies**: `crypto-js` (for local encryption), `lucide-react` (icons)
   - **Security**: All operations client-side, never transmit passwords

---

### 🤖 AI Builder Prompt

Copy and paste the text below directly into your AI builder.

**Prompt:**

```text
Build a client-side only web application called "PassGen Secure", a professional password generator with advanced security features. Use React, Tailwind CSS, and Lucide icons. The app must be fully responsive, mobile-first, and have an enterprise-level UI/UX with a security-focused, trustworthy design.

**Layout Structure (Desktop & Mobile):**

- On Desktop: Two-column layout. Left column is the Generator Panel. Right column shows Password Analysis + Saved Passwords vault.
- On Mobile: Single column. Generator at top, Analysis below, Vault at bottom.

**Color Scheme**: Use security-themed colors - deep blues, greens for success states, red/orange for warnings. Dark mode default for security feel.

**1. Generator Panel (Left):**

**Section A: Password Display**
- Large, monospace font display showing generated password
- Eye icon to toggle visibility (blur by default)
- Copy button (clipboard icon) - copies to clipboard with toast
- Refresh button to regenerate
- Strength indicator badge (Weak/Fair/Good/Strong/Excellent)

**Section B: Generation Options**
- Length Slider: 8-64 characters (default 16), with numeric input
- Character Toggles (checkboxes):
  - Uppercase (A-Z)
  - Lowercase (a-z)
  - Numbers (0-9)
  - Symbols (!@#$%^&*)
  - Ambiguous characters exclusion toggle (i,l,1,L, o,0,O)
- Advanced Options (accordion):
  - Must contain at least: [checkboxes for each type]
  - Pattern: Random / Pronounceable / PIN only
  - Custom symbols input

**Section C: Generate Button**
- Large primary button "Generate Secure Password"
- Keyboard shortcut: Spacebar to regenerate
- Animation on generation

**2. Password Analysis Section (Right Top):**

**Tab 1: Strength Meter**
- Visual strength bar with color gradient (red → yellow → green)
- Detailed metrics:
  - Entropy bits (calculated)
  - Crack time estimate (offline/online)
  - Character composition breakdown
- Tips for improvement if weak

**Tab 2: Check Existing Password**
- Input field to paste existing password
- "Analyze" button
- Shows same strength metrics
- Optional: "Check for Breaches" button (HIBP API with k-anonymity)
  - Show SHA1 hash prefix being sent (transparency)
  - Display if found in breaches + count

**3. Password Vault Section (Right Bottom):**

- Encrypted localStorage for saving passwords
- "Save This Password" button with label input (e.g., "Gmail", "Facebook")
- Master password prompt for vault encryption (PBKDF2)
- List of saved passwords:
  - Service name
  - Masked password (••••••)
  - Strength indicator
  - Copy button
  - Delete button
- Search/filter saved passwords
- Export vault (encrypted JSON)
- Import vault

**4. Security Education Section:**

- Collapsible section with password tips:
  - "Why use strong passwords?"
  - "What is entropy?"
  - "How to use a password manager"
- Subtle CTA: "Need a custom security system for your business? Contact @kenn.sr"

**5. Lead Magnet Footer:**

- Clean banner at bottom: "PassGen Secure - 100% Client-Side, No Data Sent to Servers. Dibuat oleh @kenn.sr - Butuh sistem web aman untuk bisnismu?"

**6. Styling & UX:**

- Security-focused design: dark theme, shield icons, lock animations
- Smooth transitions and micro-interactions
- Toast notifications for all actions
- Progress indicators for breach checks
- Accessible (keyboard nav, screen reader support)
- Mobile-optimized touch targets

**7. Functionality:**

- Real-time password generation on option change
- Entropy calculation: length × log2(charset_size)
- Crack time estimation based on entropy
- HIBP API integration with k-anonymity (send only first 5 chars of SHA1 hash)
- Local encryption using AES with user's master password
- Auto-lock vault after 5 minutes of inactivity
- Never log, store, or transmit any generated passwords

**8. Security Features:**

- Use crypto.getRandomValues() for CSPRNG
- Clear clipboard after 30 seconds (optional)
- No password in URL or localStorage unencrypted
- HTTPS-only recommendations
- Security headers in meta tags
```

---

## Success Metrics

- Password generation < 50ms
- Strength calculation instant
- HIBP API response < 1 second
- Lighthouse security score: 100
- Zero passwords ever transmitted to servers
- Passes security audit (no XSS, no data leaks)
