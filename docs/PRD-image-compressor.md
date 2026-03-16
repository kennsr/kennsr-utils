### 📄 PRD: CompressIMG Pro (Image Compressor)

1. **Objective**
   A client-side only web application that compresses and optimizes images without quality loss. Supports batch processing, multiple formats (JPEG, PNG, WebP, AVIF), and provides before/after comparison with download options.

2. **Target Audience**
   - UMKM owners optimizing product photos
   - Content creators for social media
   - Web developers needing optimized assets
   - Anyone needing to reduce image file sizes
   - E-commerce sellers with image size limits

3. **Core Features**
   - **No Authentication**: 100% free, no upload limits, no watermarks
   - **Privacy First**: All processing client-side, images never leave device
   - **Batch Processing**: Compress multiple images at once (up to 20)
   - **Format Support**: JPEG, PNG, WebP, AVIF input/output
   - **Smart Compression**: 
     - Quality slider (1-100)
     - Max file size target
     - Resize dimensions
     - Auto-optimize suggestion
   - **Live Preview**: Side-by-side or slider comparison
   - **Metadata**: Option to keep/remove EXIF data
   - **Download**: Individual or ZIP batch download
   - **Lead Magnet**: Optimization tips + service promotion

4. **Technical Constraints**
   - **Frontend**: Next.js (React), Tailwind CSS, Shadcn UI
   - **Logic**: 100% Client-side using Canvas API / WebAssembly
   - **Dependencies**: `browser-image-compression` or `squish` (compression), `jszip` (batch download), `lucide-react` (icons)
   - **Performance**: Handle images up to 20MB, process in < 5 seconds

---

### 🤖 AI Builder Prompt

Copy and paste the text below directly into your AI builder.

**Prompt:**

```text
Build a client-side only web application called "CompressIMG Pro", a professional image compressor with batch processing capabilities. Use React, Tailwind CSS, and Lucide icons. The app must be fully responsive, mobile-first, and have an enterprise-level UI/UX.

**Layout Structure (Desktop & Mobile):**

- On Desktop: Three-column layout on large screens:
  - Left: Upload & Settings Panel
  - Center: Before/After Comparison Viewer
  - Right: Output Queue & Download Options
- On Mobile: Single column with tabs: Upload → Preview → Download

**Color Scheme**: Clean, professional - whites, grays, with green accents for compression savings. Show file size reductions prominently.

**1. Upload & Settings Panel (Left):**

**Section A: Upload Zone**
- Large drag-and-drop zone with dashed border
- "Drop images here" or "Browse Files" button
- Accept: JPEG, PNG, WebP, AVIF
- Max 20 files, 20MB each
- Show file count and total size

**Section B: Compression Settings**
- Mode Selection (tabs):
  - **Simple Mode**: Single quality slider (0-100, default 80)
  - **Advanced Mode**: 
    - Target file size input (e.g., "Under 500KB")
    - Output format select (Original, JPEG, PNG, WebP, AVIF)
    - Resize options:
      - Original dimensions
      - Max width/height (maintain aspect ratio)
      - Custom dimensions
      - Preset sizes (Instagram, Facebook, Thumbnail)
    - Quality slider (fine-tune)
    - EXIF Data toggle (Keep/Remove)
    - Auto-optimize button (AI suggestion)

**Section C: Batch Actions**
- "Apply to All" button
- "Reset All" button
- Settings sync toggle (same settings for all images)

**2. Comparison Viewer (Center):**

**Main Preview Area**
- Side-by-side view: Original | Compressed
- OR: Slider comparison (drag handle to reveal before/after)
- Zoom controls (25%, 50%, 100%, Fit)
- Toggle between comparison modes

**Info Overlay**
- Original: dimensions, file size, format
- Compressed: dimensions, file size, format
- Savings: "−XX% (YY KB saved)" in green
- Quality score indicator

**Per-Image Settings** (when batch processing)
- Click individual image to adjust its settings
- Override global settings per image

**3. Output Queue & Download (Right):**

**Queue List**
- Thumbnails of all processed images
- Each row shows:
  - Thumbnail
  - Filename (editable)
  - Original size → Compressed size
  - Savings percentage (color-coded)
  - Download individual button
  - Remove from queue button

**Batch Download Options**
- "Download All as ZIP" button (primary, large)
- "Download Selected" (checkboxes for multi-select)
- ZIP naming: "compressed-images-[timestamp].zip"

**Stats Summary**
- Total images: X
- Total original size: Y MB
- Total compressed size: Z MB
- Total savings: A MB (B%)
- Display as progress bar or pie chart

**4. Processing States:**

- **Idle**: Upload prompt
- **Processing**: Progress bar per image + overall progress
- **Complete**: Show results with download options
- **Error**: Clear error messages (unsupported format, too large)

**5. Lead Magnet Footer:**

- Clean banner: "CompressIMG Pro - 100% Client-Side, Your Images Never Leave Your Device. Butuh website e-commerce dengan optimasi gambar otomatis? Hubungi @kenn.sr"

**6. Styling & UX:**

- Modern, clean interface with focus on image previews
- Smooth animations during upload/processing
- Skeleton loaders during compression
- Toast notifications for actions
- Dark mode support
- Accessible (keyboard nav, ARIA labels)
- Mobile touch gestures for slider comparison

**7. Functionality:**

- Instant preview on upload (low-res)
- Background compression with progress tracking
- Canvas-based compression for JPEG/WebP
- WebAssembly for AVIF/PNG (if available)
- Fallback to serverless if browser doesn't support (stretch goal)
- Auto-download ZIP when batch complete
- Clear all button with confirmation

**8. Performance:**

- Web Workers for compression (non-blocking UI)
- Lazy loading for large batches
- Memory management for large files
- Progress indicators for long operations
- Handle errors gracefully (corrupt files, etc.)

**9. Additional Features:**

- Recent compressions history (localStorage, thumbnails as blobs)
- Quick re-compress with different settings
- Keyboard shortcuts (Delete to remove, Cmd+S to download)
- Shareable settings (URL params for common presets)
```

---

## Success Metrics

- Compression completes in < 5 seconds per image
- Average file size reduction: 50-80% with minimal quality loss
- Support images up to 20MB
- Batch process up to 20 images simultaneously
- Lighthouse score > 90 on performance
- Zero images uploaded to any server (privacy guarantee)
