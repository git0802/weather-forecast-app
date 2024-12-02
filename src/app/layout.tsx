import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.shortName}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    images: [siteConfig.ogImage],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false, // Allow caching for better performance
    googleBot: {
      index: true,
      follow: true, // Allow Googlebot to follow links
      noimageindex: false, // Allow Google to index images
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black`}>
        <Providers>
          <Navbar />
          <div className="min-h-[calc(100vh-49px)] flex flex-col justify-between">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

//added suppress hydrating for it so it don't give error when load the dark mode according the system
