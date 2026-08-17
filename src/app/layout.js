import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/shared/themeProvider";

export const metadata = {
  title: "BMW Reliability Guide",
  description: "The UK's Most Trusted BMW Ownership Guide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-black antialiased">
        <ThemeProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
