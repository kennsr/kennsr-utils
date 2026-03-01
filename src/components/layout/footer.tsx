import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-slate-950 dark:border-slate-800 py-6 mt-12 w-full">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <p className="font-medium text-slate-800 dark:text-slate-200">
            Kennsr Utilities
          </p>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <ThemeToggle />
        </div>
        <div className="flex gap-4">
          <a
            href="https://wa.me/6281282411257?text=Halo%2C%20saya%20menghubungi%20dari%20website%20Kennsr%20Utilities.%20Saya%20ingin%20memberikan%20feedback%20atau%20bertanya%3A"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            Feedback & Inquiries (WhatsApp)
          </a>
          <a
            href="https://instagram.com/kenn.sr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            @kenn.sr
          </a>
        </div>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Kennsr. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
