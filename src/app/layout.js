import { Geist, Geist_Mono, PT_Serif, DM_Sans, Gloria_Hallelujah} from "next/font/google";
import "./globals.css";
import { FooterSection, HeadingDua, HeadingSatoe, HeadingTiga, Navbar } from "@/components";

export const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const gloriaHallelujah = Gloria_Hallelujah({
  variable: "--font-gloria-hallelujah",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: {
    default: "Ruang Pena",
    template: "%s | Ruang Pena",
  },
  description: "Ruang berbagi cerita dan artikel",
  openGraph: {
    siteName: "Ruang Pena",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ptSerif.variable} ${dmSans.variable} ${gloriaHallelujah.variable}`}>
      <body className={`antialiased overflow-x-hidden`}>
        <Navbar/>
        {children}
        <FooterSection/>
      </body>
    </html>
  );
}
