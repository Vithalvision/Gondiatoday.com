import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GoogleTranslate from "@/components/GoogleTranslate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GondiaToday | आपका शहर, आपकी खबर",
  description:
    "गोंदिया और आसपास के क्षेत्रों की ताज़ा खबरें, विचार और विश्लेषण।",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        {/* Google AdSense */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8503829930582705"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${inter.variable} ${poppins.variable} font-body bg-surface text-ink`}
      >
          <div className="notranslate" translate="no">
            <Header />
          </div>
          <div className="notranslate" translate="no">
            <UtilityBar />
          </div>

        <main>{children}</main>

        <div className="notranslate" translate="no">
          <Footer />
        </div>

        {/* Google Translate Floating Widget */}
        <GoogleTranslate />
      </body>
    </html>
  );
}
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="hi" translate="no" className="notranslate">
//       <head>
//         {/* Google AdSense */}
//         <Script
//           async
//           strategy="afterInteractive"
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8503829930582705"
//           crossOrigin="anonymous"
//         />
//       </head>

//       <body
//         className={`${inter.variable} ${poppins.variable} font-body bg-surface text-ink`}
//       >
//         <Header />
//         <UtilityBar />

//         <main translate="yes" className="notranslate-off">
//           {children}
//         </main>

//         <Footer />

//         {/* Google Translate Floating Widget */}
//         <GoogleTranslate />
//       </body>
//     </html>
//   );
// }