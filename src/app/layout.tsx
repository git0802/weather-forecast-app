import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import siteMetadata from "@/utils/siteMetaData";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,

  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    // nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="google-site-verification"
        content="k3Mu_NRmonR916_W69sQXbvwCkKEQ8VczZ8IAWJpmBc"
      />
      <body className={`${inter.className} bg-white dark:bg-black`}>
        <Providers>
          <Navbar />
          <div className="min-h-[calc(100vh-49px)] flex flex-col justify-between">
            {children}
            <Footer />
          </div>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

//added suppress hydrating for it so it don't give error when load the dark mode according the system
