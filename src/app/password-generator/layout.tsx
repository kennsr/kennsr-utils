import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassGen Secure - Free Secure Password Generator",
  description:
    "Generate cryptographically strong passwords instantly. Free, client-side only, with breach checking and password strength analysis.",
  keywords: [
    "password generator",
    "secure password",
    "strong password",
    "password creator",
    "random password",
    "password strength",
  ],
  openGraph: {
    title: "PassGen Secure - Free Secure Password Generator",
    description:
      "Generate cryptographically strong passwords instantly. 100% client-side, never transmitted.",
    type: "website",
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
