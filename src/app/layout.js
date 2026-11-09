import { Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FreeQuoteSticky from "@/components/shared/FreeQuoteForm";
import { ThemeProvider } from "@/components/shared/themeProvider";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const BASE_URL = "https://mercedesengines.uk";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mercedes-Benz Ownership Guide UK | Reliability Rankings & Engine Data",
    template: "%s | Mercedes Engines UK",
  },
  description:
    "Reliability rankings, real failure data, and honest repair-vs-replace economics for every Mercedes-Benz A-Class, C-Class, E-Class, S-Class, GLC, GLE and AMG sold in the UK.",
  icons: {
    icon: [{ url: "/icon.webp", type: "image/webp" }],
    shortcut: ["/icon.webp"],
    apple: [{ url: "/icon.webp" }],
  },
  openGraph: {
    title: "Mercedes-Benz Ownership Guide UK | Reliability Rankings & Engine Data",
    description:
      "Reliability rankings, real failure data, and honest repair-vs-replace economics for every Mercedes-Benz A-Class, C-Class, E-Class, S-Class, GLC, GLE and AMG sold in the UK.",
    siteName: "Mercedes Engines UK",
    type: "website",
    images: [{ url: "/og-share.webp", width: 1734, height: 907, alt: "Mercedes Engines UK" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercedes-Benz Ownership Guide UK | Reliability Rankings & Engine Data",
    description:
      "Reliability rankings, real failure data, and honest repair-vs-replace economics for every Mercedes-Benz model sold in the UK.",
    images: ["/og-share.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full ${lora.variable}`}>
      <body className="flex min-h-full flex-col bg-[var(--color-page)] text-[var(--color-text)] antialiased">
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "z797ot8dx7");
          `}
        </Script>
        <ThemeProvider>
          <Navbar />
          <div className="flex-1 bg-[var(--color-page)]">{children}</div>
          <Footer />
          <FreeQuoteSticky />
        </ThemeProvider>
      </body>
    </html>
  );
}
