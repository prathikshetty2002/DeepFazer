import { DM_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Bot from "./components/Bot/Bot.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
const inter = DM_Sans({ subsets: ["latin"] });
export const metadata = {
  title: "deepfazer",
  description:
    "Think of Fitness Think of Us Creation By Prathik Shetty, Harsh Verma , Ashutosh Pandey",
  image: "/logo.png",
  url: "https://deep-fazer.vercel.app/",
  type: "website",
  siteName: "deepfazer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <SpeedInsights />
        <Bot />
        <Footer />
      </body>
    </html>
  );
}
