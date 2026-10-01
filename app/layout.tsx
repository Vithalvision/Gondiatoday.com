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
  metadataBase: new URL("https://gondiatoday.com"),
  title: {
    default: "GondiaToday | Latest Gondia News, Updates & Local Coverage",
    template: "%s | GondiaToday",
  },
  description:
    "गोंदिया (Gondia) और आसपास के क्षेत्रों (Maharashtra) की सबसे ताज़ा खबरें, ब्रेकिंग न्यूज़, विचार और सटीक विश्लेषण। GondiaToday पर पाएं हर छोटी-बड़ी खबर सबसे पहले।",
  keywords: ["Gondia News", "Gondia", "Maharashtra News", "Gondia Today", "गोंदिया न्यूज़", "Latest News in Gondia", "Local News Gondia"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GondiaToday | Latest Gondia News, Updates & Local Coverage",
    description: "गोंदिया की सबसे ताज़ा खबरें और सटीक विश्लेषण।",
    url: "https://gondiatoday.com",
    siteName: "GondiaToday",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GondiaToday",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GondiaToday | Latest Gondia News",
    description: "गोंदिया की ताज़ा खबरें",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "name": "GondiaToday",
  "url": "https://gondiatoday.com",
  "logo": "https://gondiatoday.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "news@gondiatoday.com",
    "contactType": "customer service"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "GondiaToday",
  "url": "https://gondiatoday.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://gondiatoday.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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