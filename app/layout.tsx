import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { interests, links, siteUrl } from "@/lib/site";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const title = "Aaron Paul - Portfolio";
const description =
  "Aaron Paul is a Computer Science and Business Systems student, developer and creative technologist building practical software across backend, data and real-time systems.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — Aaron Paul",
  },
  description,
  applicationName: "Aaron Paul — Portfolio",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Aaron Paul" }],
  creator: "Aaron Paul",
  keywords: [
    "Aaron Paul",
    "developer",
    "creative technologist",
    "computer science",
    "backend development",
    "real-time systems",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aaron Paul",
    title,
    description,
    images: [
      {
        url: "/images/profile.jpeg",
        width: 960,
        height: 1280,
        alt: "Aaron Paul",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/images/profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f2ece0",
  colorScheme: "light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Paul",
  jobTitle: "Developer & Creative Technologist",
  description,
  knowsAbout: interests,
  sameAs: [links.github, links.linkedin, links.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="min-h-dvh font-sans">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
