import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-kids-chatbot-client.vercel.app"), 

  title: {
    default: "AI Kids Chatbot",
    template: "%s | AI Kids Chatbot",
  },

  description:
    "AI Kids Chatbot is a safe, interactive, and educational chatbot designed for children. Powered by Google Gemini, it provides engaging conversations, learning activities, and a secure AI experience.",

  keywords: [
    "AI Kids Chatbot",
    "Kids Learning",
    "Google Gemini",
    "Artificial Intelligence",
    "Educational Chatbot",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Prisma",
    "Child Safe AI",
  ],

  authors: [
    {
      name: "Sharifa",
    },
  ],

  creator: "Sharifa",

  publisher: "Sharifa",

  applicationName: "AI Kids Chatbot",

  category: "Education",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "AI Kids Chatbot",
    description:
      "A child-friendly AI chatbot that helps kids learn, explore, and enjoy safe conversations powered by Google Gemini.",
    url: "https://ai-kids-chatbot-client.vercel.app",
    siteName: "AI Kids Chatbot",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Kids Chatbot",
    description:
      "Safe AI-powered learning assistant for children built with Next.js and Google Gemini.",
  },

icons: {
      icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}