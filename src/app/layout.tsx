import type { Metadata, Viewport } from "next";
import { getDeveloper } from "@/lib/api";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const dev = await getDeveloper();
  return {
    title: {
      default: `${dev.name} — ${dev.title}`,
      template: `%s | ${dev.name}`,
    },
    description: dev.bio,
    keywords: [
      "web developer", "full-stack developer", "React developer",
      "Next.js developer", "Sri Lanka", dev.name,
    ],
    authors: [{ name: dev.name }],
    creator: dev.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      title: `${dev.name} — ${dev.title}`,
      description: dev.bio,
      siteName: dev.name,
    },
    twitter: {
      card: "summary",
      title: `${dev.name} — ${dev.title}`,
      description: dev.bio,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#f2ead8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,800&family=IM+Fell+English:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Special+Elite&family=Josefin+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
